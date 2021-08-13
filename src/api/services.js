import Verida from '@verida/datastore';


class MarkDownServices {

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
      const dataStore = await veridaDApp.openDatabase('notes');
      return {
        app:veridaDApp,
        dataStore
      }
    } catch (error) {
      return error
    }
  }

  async postContent( data, database ) {
    try {
      await database.save({
        title: data.title,
        isFavorite: false,
        body: data.markdownVal
      });
      let response = await database.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async deleteContent(item, database) {
    try {
      await database.delete(item);
      let response = await database.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async updateContent(item , database) {
    try {
      await database.save(item);
      let response = await database.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };

  async getNotes(database) {
    try {
      const response = await database.getMany();
      return response;
    } catch (error) {
      return error;
    }
  };
}



const appServices = new MarkDownServices();
export default appServices;
