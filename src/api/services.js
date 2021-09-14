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

          this.veridaDapp = veridaDApp;

          this.dataStore = await veridaDApp.openDatastore(DATASTORE_SCHEMA);
          this.profileInstance = await veridaDApp.openProfile(response.did, 'Verida: Vault');

          const data = await this.profileInstance.getMany();

          const userProfile = data.reduce((result, item) => {
            result[item.key] = item.value;
            return result;
          }, {});

          if (cb) {
            cb(userProfile);
          }
        } catch (error) {
          this.handleErrors(error);
        }
      }
    });
  }

  async profileEventSubscription() {
    let userProfile = {};
    await this.initApp();
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
  }

  async openNote(noteId) {
    try {
      this.currentNote = await this.dataStore.get(noteId);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async updateNote(data) {
    try {
      await this.openNote(data._id);
      const newItem = Object.assign(this.currentNote, data);
      await this.dataStore.save(newItem);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async listenDbChanges() {
    let notes = [];
    try {
      const dataStore = await this.veridaDapp.openDatastore(DATASTORE_SCHEMA);
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
  async onSave(item) {
    try {
      await this.initApp();
      await this.dataStore.save(item);
    } catch (error) {
      this.handleErrors(error);
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
