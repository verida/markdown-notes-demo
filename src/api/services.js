import Verida from '@verida/datastore';



class MarkDownServices {
  veridaDapp;
  dataStore;

  async initApp() {
    if(this.dataStore) return;
    await this.connectVault();
  }

  async connectVault() {
    try {
      const web3Provider = await Verida.Helpers.wallet.connectWeb3('ethr');
      const address = await web3Provider.instance.eth.getAccounts();
      Verida.setConfig({
        appName: 'markdown notes'
      });
      const veridaDApp = new Verida({
        chain: 'ethr',
        address: address[0],
        web3Provider: web3Provider
      });
      await veridaDApp.connect(true);
      this.dataStore = await veridaDApp.openDatastore('http://localhost:3008/schema.json');
      this.veridaDapp = veridaDApp
      return {
        app: veridaDApp,
      }
    } catch (error) {
      return error
    }
  }

  async postContent(data) {
    await this.initApp()
    try {
      await this.dataStore.save({
        title: data.title,
        isFavorite: false,
        body: data.markdownVal
      });
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      console.log({error});
      return error;
    }
  };

  async deleteContent(item) {
    await this.initApp()
    try {
      await this.dataStore.delete(item);
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async updateContent(item) {
    await this.initApp()
    try {
      await this.dataStore.save(item);
      let response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async getNotes() {
    await this.initApp()
    try {
      const response = await this.dataStore.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };
}



const appServices = new MarkDownServices();
export default appServices;
