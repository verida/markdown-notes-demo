import Verida from '@verida/datastore';
import { veridaVaultLogin } from '@verida/vault-auth-client'
import { CLIENT_AUTH_NAME, DATASTORE_SCHEMA, LOGIN_URI, SERVER_URI } from '../constants';


class MarkDownServices {
  veridaDapp;
  dataStore;
  profileInstance;

  initApp() {
    if (this.dataStore) return;
    this.connectVault();
  }


  

  connectVault(appCallbackFn) {
    veridaVaultLogin({
      loginUri: LOGIN_URI,
      serverUri: SERVER_URI,
      appName: CLIENT_AUTH_NAME,
      callback: async (response) => {
        try {
          const veridaDApp = new Verida({
            did: response.did,
            signature: response.signature,
            // appName: APP_NAME
            appName: CLIENT_AUTH_NAME
          })

          await veridaDApp.connect(true)
          window.veridaDApp = veridaDApp
          

          this.dataStore = await window.veridaDApp.openDatastore(DATASTORE_SCHEMA)
          const notes = await this.dataStore.getMany();


          this.profileInstance = await window.veridaDApp.openProfile(response.did, 'Verida: Vault');

          const data = await this.profileInstance.getMany()
          const userProfile = data.reduce((result, item) => {
            result[item.key] = item.value;
            return result;
          }, {});

          if (appCallbackFn) {
            appCallbackFn({
              notes,
              userProfile,
              error: null
            })
          }
        } catch (error) {
           if (appCallbackFn) {
            appCallbackFn({
            notes: null,
            userProfile: null,
            error
          })
        }}
      }
    })
  }

  async profileEventSubscription() {
    this.initApp()

    const userDB = await this.profileInstance._store.getDb();
    const PouchDB = await userDB.getInstance();

    return {
      userDB,
      PouchDB,
    }
  };

  async postContent(data) {
    this.initApp()
    try {
      await this.dataStore.save({
        title: data.title,
        isFavorite: false,
        body: data.markdownVal
      });
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async deleteContent(item) {
    this.initApp()
    try {
      await this.dataStore.delete(item);
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async updateContent(item) {
    this.initApp()
    try {
      await this.dataStore.save(item);
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async getNotes() {
    this.initApp()
    try {
      const response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async logout() {
    await window.veridaDApp.disconnect();
    window.veridaDapp = null;
    this.dataStore = {};
    this.veridaDapp = {};
    // this.profileInstance = {};
  };

}



const appServices = new MarkDownServices();



export default appServices;
