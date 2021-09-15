/* eslint-disable */

import Verida from '@verida/datastore';
import { veridaVaultLogin } from '@verida/vault-auth-client';
import {
  CLIENT_AUTH_NAME,
  DATASTORE_SCHEMA,
  LOGIN_URI,
  LOGO_URL,
  SERVER_URI,
  VERIDA_USER_SIGNATURE
} from '../constants';
import Store from '../utils/store';
const EventEmitter = require('events');

class MarkDownServices extends EventEmitter {
  veridaDapp;
  dataStore;
  currentNote;
  profileInstance;
  error = {};

  async initApp() {
    if (!this.dataStore) {
      this.connectVault();
    }
  }

  connectVault(cb) {
    Verida.setConfig({
      appName: CLIENT_AUTH_NAME
    });
    veridaVaultLogin({
      loginUri: LOGIN_URI,
      serverUri: SERVER_URI,
      appName: CLIENT_AUTH_NAME,
      logoUrl: LOGO_URL,
      callback: async (response) => {
        try {
          const veridaDApp = new Verida({
            did: response.did,
            signature: response.signature,
            appName: CLIENT_AUTH_NAME
          });
          await veridaDApp.connect(true);
          this.dataStore = await veridaDApp.openDatastore(DATASTORE_SCHEMA);
          this.veridaDApp = veridaDApp;
          if (cb) {
            cb();
          }
        } catch (error) {
          this.handleErrors(error);
        }
      }
    });
  }
  async getUserProfile() {
    const user = Store.get(VERIDA_USER_SIGNATURE);
    try {
      await this.initApp();
      this.profileInstance = await this.veridaDApp.openProfile(user.did, 'Verida: Vault');
      const data = await this.profileInstance.getMany();
      const userProfile = data.reduce((result, item) => {
        result[item.key] = item.value;
        return result;
      }, {});
      return userProfile;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async profileEventSubscription() {
    let userProfile = {};
    await this.initApp();
    try {
      const userDB = await this.profileInstance._store.getDb();
      const PouchDB = await userDB.getInstance();
      PouchDB.changes({
        since: 'now',
        live: true
      }).on('change', async (info) => {
        userProfile = await userDB.get(info.id, {
          rev: info.changes[0].rev
        });
      });
      return userProfile;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async openNote(noteId) {
    try {
      this.currentNote = await this.dataStore.get(noteId);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async updateNote(data) {
    await this.initApp();
    try {
      await this.openNote(data._id);
      const newItem = Object.assign(this.currentNote, data);
      await this.dataStore.save(newItem);
      await this.pushNotes();
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async listenDbChanges() {
    let notes = [];
    try {
      await this.initApp();
      const dataStore = await this.dataStore.openDatastore(DATASTORE_SCHEMA);
      dataStore.changes(function (changeInfo) {
        notes = changeInfo;
      });
      return notes;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async deleteNote(id) {
    try {
      await this.openNote(id);
      await this.dataStore.delete(this.currentNote);
      await this.pushNotes();
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async pushNotes() {
    const filterOptions = {
      limit: 40,
      skip: 0,
      sort: [{ title: 'desc' }]
    };
    try {
      const notes = await this.fetchAllNotes({}, filterOptions);
      this.emit('onNoteChanged', notes);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async fetchAllNotes(filter, options) {
    try {
      await this.initApp();
      const response = await this.dataStore.getMany(filter, options);
      return response;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async saveNote(item) {
    try {
      await this.initApp();
      await this.dataStore.save(item);
      await this.pushNotes();
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
  handleErrors(error) {
    this.error = error;
    this.emit('onError', error);
  }
  logout() {
    Store.remove(VERIDA_USER_SIGNATURE);
    this.veridaDApp.disconnect();
    this.dataStore = {};
    this.veridaDapp = {};
    this.profileInstance = {};
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
