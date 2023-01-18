/* eslint-disable */

import { Network, EnvironmentType } from '@verida/client-ts';
import { VaultAccount, hasSession } from '@verida/account-web-vault';

const EventEmitter = require('events');

const { REACT_APP_LOGO_URL, REACT_APP_CONTEXT_NAME } = process.env;
class MarkDownServices extends EventEmitter {
  _did = null;
  _context = null;
  _dataStore = null;
  _currentNote = {};
  _profileInstance = null;
  _account = null;
  errors = {};
  isConnected = false;
  notes = [];
  profile = null;

  getDatastore() {
    if (!this._dataStore) {
      this.handleErrors(new Error("App isn't initialized"));
    }

    return this._dataStore;
  }

  hasSession() {
    return hasSession(REACT_APP_CONTEXT_NAME);
  }

  async connectVault() {
    this._account = new VaultAccount({
      request: {
        logoUrl: REACT_APP_LOGO_URL
      }
    });

    this._context = await Network.connect({
      client: {
        environment: EnvironmentType.TESTNET
      },
      account: this._account,
      context: {
        name: REACT_APP_CONTEXT_NAME
      }
    });

    if (!this._context) {
      this.emit('authenticationCancelled');
      return;
    }

    this._did = await this._account.did();

    this._dataStore = await this._context.openDatastore(`${window.location.origin}/schema.json`);

    await this.initNotesEventLister();

    await this.initProfileEventLister();

    await this.getProfile();

    if (this._context) {
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
    const client = await this._context.getClient();
    const profileInstance = await client.openPublicProfile(this._did, 'Verida: Vault');
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
    this.getDatastore().changes(listenNoteChange);
  }

  async openNote(noteId) {
    try {
      this._currentNote = await this.getDatastore().get(noteId);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async saveNote(data) {
    try {
      if (data._id) {
        await this.openNote(data._id);
        const noteItem = Object.assign(this._currentNote, data);
        await this.getDatastore().save(noteItem);
      } else {
        await this.getDatastore().save(data);
      }
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async deleteNote(id) {
    try {
      await this.openNote(id);
      await this.getDatastore().delete(this._currentNote);
      return true;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async getNotes(options) {
    const defaultOptions = {
      limit: 40,
      skip: 0,
      sort: [{ title: 'desc' }]
    };

    const filter = options || defaultOptions;

    try {
      const notes = await this.getDatastore().getMany({}, filter);
      return notes || [];
    } catch (error) {
      this.handleErrors(error);
    }
  }

  handleErrors(error) {
    this._error = error;
    this.emit('error', error);
  }

  async logout() {
    await this._context.getAccount().disconnect(REACT_APP_CONTEXT_NAME);
    this._context = null;
    this._dataStore = null;
    this._currentNote = null;
    this._profileInstance = null;
    this._account = null;
    this._did = null;
    this.error = {};
    this.profile = {};
    this.notes = [];
    this.isConnected = false;
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
