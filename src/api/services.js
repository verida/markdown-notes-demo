/* eslint-disable */

import Verida from '@verida/datastore';
import { veridaVaultLogin } from '@verida/vault-auth-client';
import {
  CLIENT_AUTH_NAME,
  DATASTORE_SCHEMA,
  LOGIN_URI,
  LOGO_URL,
  SERVER_URI,
  USER_SESSION_KEY,
  VERIDA_USER_SIGNATURE
} from '../constants';
import Store from '../utils/store';

let filter = {
  organization: 'markdown_notes'
};

let filterOptions = {
  limit: 50,
  skip: 0,
  sort: ['title']
};

class MarkDownServices {
  veridaDapp;
  dataStore;
  profileInstance;

  initApp() {
    if (this.dataStore) return;
    this.connectVault();
  }

  connectVault(appCallbackFn) {
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
            // appName: APP_NAME
            appName: CLIENT_AUTH_NAME
          });

          await veridaDApp.connect(true);
          window.veridaDApp = veridaDApp;

          this.dataStore = await window.veridaDApp.openDatastore(DATASTORE_SCHEMA);
          const notes = await this.dataStore.getMany();

          this.profileInstance = await window.veridaDApp.openProfile(response.did, 'Verida: Vault');

          const data = await this.profileInstance.getMany();
          const userProfile = data.reduce((result, item) => {
            result[item.key] = item.value;
            return result;
          }, {});
          Store.set(USER_SESSION_KEY, true);

          if (appCallbackFn) {
            appCallbackFn({
              notes,
              userProfile,
              error: null
            });
          }
        } catch (error) {
          if (appCallbackFn) {
            appCallbackFn({
              notes: null,
              userProfile: null,
              error
            });
          }
        }
      }
    });
  }

  async profileEventSubscription() {
    this.initApp();
    const userDB = await this.profileInstance._store.getDb();
    const PouchDB = await userDB.getInstance();

    return {
      userDB,
      PouchDB
    };
  }

  async postContent(data) {
    this.initApp();
    console.log(data);
    try {
      await this.dataStore.save(data);
      let response = await this.getNotes();
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteContent(item) {
    this.initApp();
    item._deleted = true;
    try {
      await this.dataStore.delete(item);
      let response = await this.getNotes();
      return response;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async updateContent(item) {
    this.initApp();
    try {
      await this.dataStore.save(item);
      let response = await this.getNotes();
      return response;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async getNotes() {
    this.initApp();
    try {
      const response = await this.dataStore.getMany();
      // const response = await this.dataStore.getMany(filter, filterOptions);
      return response;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    await window.veridaDApp.disconnect();
    Store.remove(USER_SESSION_KEY);

    //TODO : action from datastore library.

    Store.remove(VERIDA_USER_SIGNATURE);
    window.veridaDapp = null;
    this.dataStore = {};
    this.veridaDapp = {};
    // this.profileInstance = {};
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
