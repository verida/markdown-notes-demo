/* eslint-disable */

import { Network } from '@verida/client-ts';
import { VaultAccount } from '@verida/account-web-vault';
import {
  CLIENT_AUTH_NAME,
  DATASTORE_SCHEMA,
  LOGIN_URI,
  LOGO_URL,
  SERVER_URI,
  USER_SESSION_KEY
} from '../constants';
import Store from '../utils/store';

class MarkDownServices {
  veridaDapp = null;
  dataStore = null;
  profileInstance = null;
  account = null;
  did = null;
  errors = {};

  async initApp() {
    if (this.dataStore) {
      return;
    }

    this.connectVault();
  }

  async onConnect(appCallbackFn) {
    this.did = await this.account.did()

    const context = this.veridaDapp;
    this.dataStore = await context.openDatastore(DATASTORE_SCHEMA);

    // @todo: why fetching notes here? fetch on demand
    const notes = await this.dataStore.getMany();

    const client = await context.getClient();
    
    // Commenting this out as profiles appears broken.
    /*this.profileInstance = await client.openPublicProfile(this.did, 'Verida: Vault');
    console.log('d', this.profileInstance);

    // @todo: why fetching profile here? fetch on demand
    const data = await this.profileInstance.getMany();
    console.log('e');

    const userProfile = data.reduce((result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});*/
    const userProfile = {};

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

  async connectVault(appCallbackFn) {
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

    this.onConnect(appCallbackFn);
  }

  async onProfileChange(callback) {
    await this.initApp();
    this.profileInstance.listen(callback);
  }

  async postContent(data) {
    this.initApp();
    try {
      await this.dataStore.save(data);
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteContent(item) {
    await this.initApp();

    try {
      console.log('deleting', item);
      const deleteResponse = await this.dataStore.delete(item);
      let response = await this.dataStore.getMany();
      return response;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async updateContent(item) {
    this.initApp();
    console.log(item);
    try {
      await this.dataStore.save(item);
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  }

  async getNotes() {
    this.initApp();
    try {
      const response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    await this.veridaDapp.disconnect();
    this.dataStore = null;
    this.veridaDapp = null;
    this.profileInstance = null;
  }
}

const markDownServices = new MarkDownServices();

export default markDownServices;
