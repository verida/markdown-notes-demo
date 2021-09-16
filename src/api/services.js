/* eslint-disable */

import { Network } from '@verida/client-ts';
import { VaultAccount } from '@verida/account-web-vault';
import {
  CLIENT_AUTH_NAME,
  DATASTORE_SCHEMA,
  LOGIN_URI,
  LOGO_URL,
  SERVER_URI
} from '../constants';
const EventEmitter = require('events');

class MarkDownServices extends EventEmitter {
  veridaDapp = null;
  dataStore = null;
  currentNote = null;
  profileInstance = null;
  account = null;
  did = null;
  error = {};

  /**
   * Public method for initializing this app
   */
  async initApp() {
    if (!this.dataStore) {
      await this.connectVault();
    }
  }

  appInitialized() {
    return this.dataStore !== null
  }

  /**
   * Private method for connecting to the vault
   */
  async connectVault() {
    this.account = new VaultAccount({
      defaultDatabaseServer: {
        type: 'VeridaDatabase',
        endpointUri: 'https://db.testnet.verida.io:5002/'
      },
      defaultMessageServer: {
        type: 'VeridaMessage',
        endpointUri: 'https://db.testnet.verida.io:5002/'
      },
      vaultConfig: {
        loginUri: LOGIN_URI,
        serverUri: SERVER_URI,
        logoUrl: LOGO_URL
      }
    });
    
    this.veridaDapp = await Network.connect({
      client: {
        defaultDatabaseServer: {
          type: 'VeridaDatabase',
          endpointUri: 'https://db.testnet.verida.io:5002/'
        },
        defaultMessageServer: {
          type: 'VeridaMessage',
          endpointUri: 'https://db.testnet.verida.io:5002/'
        }
      },
      account: this.account,
      context: {
        name: CLIENT_AUTH_NAME
      }
    });

    this.did = await this.account.did()
    this.dataStore = await this.veridaDapp.openDatastore(DATASTORE_SCHEMA);

    this.emit("initialized")
  }

  async getUserProfile() {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    try {
      if (!this.profileInstance) {
        const client = this.veridaDapp.getClient()
        this.profileInstance = await client.openPublicProfile(this.did, 'Verida: Vault');
      }
      
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

  // @todo: fix event subscription
  async profileEventSubscription() {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    let userProfile = {};
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
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    try {
      this.currentNote = await this.dataStore.get(noteId);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async updateNote(data) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    try {
      if (data._id) {
        await this.openNote(data._id);
        const noteItem = Object.assign(this.currentNote, data);
        await this.saveNote(noteItem);
      } else {
        await this.saveNote(data);
      }
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async deleteNote(id) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

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

  async listenDbChanges() {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    let notes = [];
    try {
      const dbInstance = await this.dataStore.openDatastore(DATASTORE_SCHEMA);
      dbInstance.changes(function (changeInfo) {
        notes = changeInfo;
      });
      return notes;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async pushNotes() {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    try {
      const notes = await this.fetchAllNotes();
      this.emit('onNoteChanged', notes);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async fetchAllNotes(options) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    const defaultOptions = {
      limit: 40,
      skip: 0,
      sort: [{ title: 'desc' }]
    };
    const filter = options || defaultOptions;
    try {
      const response = await this.dataStore.getMany({}, filter);
      return response;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async saveNote(item) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"))
    }

    await this.dataStore.save(item);
    await this.pushNotes();
  }

  handleErrors(error) {
    this.error = error;
    this.emit('onError', error);
  }

  async logout() {
    await this.account.disconnect();
    this.veridaDapp = null;
    this.dataStore = null;
    this.currentNote = null;
    this.profileInstance = null;
    this.account = null;
    this.did = null;
    this.error = {};
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
