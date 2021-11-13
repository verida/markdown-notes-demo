/* eslint-disable */

import { Network } from '@verida/client-ts';
import { VaultAccount, hasSession } from '@verida/account-web-vault';
import {
  CONTEXT_NAME,
  DATASTORE_SCHEMA,
  VERIDA_ENVIRONMENT,
  VERIDA_TESTNET_DEFAULT_SERVER
} from '../constants';
const EventEmitter = require('events');

class MarkDownServices extends EventEmitter {
  context = null;
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

  hasSession() {
    return hasSession(CONTEXT_NAME);
  }

  /**
   * Private method for connecting to the vault
   */
  async connectVault() {
    this.account = new VaultAccount({
      defaultDatabaseServer: {
        type: 'VeridaDatabase',
        endpointUri: VERIDA_TESTNET_DEFAULT_SERVER
      },
      defaultMessageServer: {
        type: 'VeridaMessage',
        endpointUri: VERIDA_TESTNET_DEFAULT_SERVER
      }
    });

    this.context = await Network.connect({
      client: {
        environment: VERIDA_ENVIRONMENT
      },
      account: this.account,
      context: {
        name: CONTEXT_NAME
      }
    });

    if (!this.context) {
      this.emit('authenticationCancelled');
      return;
    }
    this.did = await this.account.did();

    this.dataStore = await this.context.openDatastore(DATASTORE_SCHEMA);
    await this.initProfile();
    await this.initNotes();

    this.emit('initialized');
  }

  async initProfile() {
    const services = this;
    const client = await services.context.getClient();
    services.profileInstance = await client.openPublicProfile(services.did, 'Verida: Vault');
    const cb = async () => {
      const data = await services.profileInstance.getMany();
      services.profile = {
        name: data.name,
        country: data.country
      };
      services.emit('profileChanged', services.profile);
    };
    services.profileInstance.listen(cb);
    await cb();
  }

  async initNotes() {
    const services = this;
    const cb = async function () {
      services.notes = await services.fetchAllNotes();
      console.log(services.notes);
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
    await this.context.getAccount().disconnect(CONTEXT_NAME);
    this.context = null;
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
