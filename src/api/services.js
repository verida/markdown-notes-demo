/* eslint-disable */

import { Network, EnvironmentType } from '@verida/client-ts';
import { VaultAccount, hasSession } from '@verida/account-web-vault';

const EventEmitter = require('events');

const { REACT_APP_LOGO_URL, REACT_APP_CONTEXT_NAME } = process.env;
class MarkDownServices extends EventEmitter {
  context = null;
  dataStore = null;
  currentNote = null;
  profileInstance = null;
  account = null;
  did = null;
  error = {};
  isConnected = false;

  notes = [];
  profile = null;

  /**
   * Public method for initializing this app
   */

  appInitialized() {
    return this.dataStore !== undefined;
  }

  hasSession() {
    return hasSession(REACT_APP_CONTEXT_NAME);
  }

  /**
   * Private method for connecting to the vault
   */
  async connectVault() {
    this.account = new VaultAccount({
      request: {
        logoUrl: REACT_APP_LOGO_URL
      }
    });

    this.context = await Network.connect({
      client: {
        environment: EnvironmentType.TESTNET
      },
      account: this.account,
      context: {
        name: REACT_APP_CONTEXT_NAME
      }
    });

    if (!this.context) {
      this.emit('authenticationCancelled');
      return;
    }

    this.did = await this.account.did();

    this.dataStore = await this.context.openDatastore(`${window.location.origin}/schema.json`);

    await this.initNotesEventLister();

    await this.initProfileEventLister();

    await this.getProfile();

    if (this.context) {
      this.isConnected = true;
    }

    this.emit('initialized');
  }

  async initProfileEventLister() {
    const services = this;
    const profileInstance = await services.getProfileClient();
    const listenProfileChange = async () => {
      const data = await profileInstance.getMany();
      this.buildProfileData(data);
      this.emit('profileChanged', this.profile);
    };
    profileInstance.listen(listenProfileChange);
  }

  async getProfileClient() {
    const client = await this.context.getClient();
    const profileInstance = await client.openPublicProfile(this.did, 'Verida: Vault');
    return profileInstance;
  }

  buildProfileData(data) {
    this.profile = {
      name: data.name,
      country: data.country,
      avatar: data?.avatar?.uri
    };
  }

  async getProfile() {
    const profileInstance = await this.getProfileClient();
    const data = await profileInstance.getMany();
    this.buildProfileData(data);
    return true;
  }

  async initNotesEventLister() {
    const services = this;
    const listenNoteChange = async function () {
      services.notes = await services.getNotes();
      services.emit('notesChanged', services.notes);
    };
    this.dataStore.changes(listenNoteChange);
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

  async getNotes(options) {
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
      return response || [];
    } catch (error) {
      this.handleErrors(error);
    }
  }

  handleErrors(error) {
    this.error = error;
    this.emit('error', error);
  }

  async logout() {
    await this.context.getAccount().disconnect(REACT_APP_CONTEXT_NAME);
    this.context = null;
    this.dataStore = null;
    this.currentNote = null;
    this.profileInstance = null;
    this.account = null;
    this.did = null;
    this.error = {};
    this.notes = [];
    this.profile = {};
    this.isConnected = false;
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
