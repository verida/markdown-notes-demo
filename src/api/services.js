/* eslint-disable */

import { Network } from '@verida/client-ts';
import { VaultAccount } from '@verida/account-web-vault';
import { CLIENT_AUTH_NAME, DATASTORE_SCHEMA, LOGIN_URI, LOGO_URL, SERVER_URI } from '../constants';
const EventEmitter = require('events');

class MarkDownServices extends EventEmitter {
  veridaDapp = null;
  dataStore = null;
  currentNote = null;
  profileInstance = null;
  account = null;
  did = null;
  error = {};

  notes = [];
  profile = {};

  /**
   * Public method for initializing this app
   */
  async initApp() {
    if (!this.dataStore) {
      await this.connectVault();
    }
  }

  appInitialized() {
    return this.dataStore !== null;
  }

  /**
   * Private method for connecting to the vault
   */
  async connectVault() {
    this.account = new VaultAccount({
      loginUri: LOGIN_URI,
      serverUri: SERVER_URI,
      logoUrl: LOGO_URL
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

    this.did = await this.account.did();
    this.dataStore = await this.veridaDapp.openDatastore(DATASTORE_SCHEMA);
    await this.initProfile();
    await this.initNotes();

    this.emit('initialized');
  }

  async initProfile() {
    const services = this;
    const client = this.veridaDapp.getClient();
    this.profileInstance = await client.openPublicProfile(this.did, 'Verida: Vault');

    const cb = async function () {
      const data = await services.profileInstance.getMany();
      services.profile = data.reduce((result, item) => {
        result[item.key] = item.value;
        return result;
      }, {});

      services.emit('profileChanged', services.profile);
    };

    this.profileInstance.listen(cb);
    cb();
  }

  async initNotes() {
    const services = this;
    const cb = async function () {
      services.notes = await services.fetchAllNotes();
      services.emit('notesChanged', services.notes);
    };

    this.dataStore.changes(cb);
    cb();
  }

  async openNote(noteId) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"));
    }

    try {
      this.currentNote = await this.dataStore.get(noteId);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async saveNote(data) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"));
    }

    try {
      if (data._id) {
        await this.openNote(data._id);
        const noteItem = Object.assign(this.currentNote, data);
        await this.dataStore.save(noteItem);
      } else {
        await this.dataStore.save(data);
      }

      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async deleteNote(id) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"));
    }

    try {
      await this.openNote(id);
      await this.dataStore.delete(this.currentNote);
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async fetchAllNotes(options) {
    if (!this.appInitialized()) {
      this.handleErrors(new Error("App isn't initialized"));
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

  handleErrors(error) {
    this.error = error;
    this.emit('error', error);
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
    this.notes = [];
    this.profile = {};
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
