import { useContext, useState } from 'react';
import Verida from '@verida/datastore';
import { AppContext } from '../contextApi/ContextProvider'

const useAuthentication = () => {
  const { setAppData, startUp,setNotes } = useContext(AppContext);
  const [isConnecting, setIsConnecting] = useState(false);


  const initializeApp = async () => {
    startUp()
    setIsConnecting(true)
    try {
      const web3Provider = await Verida.Helpers.wallet.connectWeb3('ethr');
      const address = await web3Provider.instance.eth.getAccounts()
      Verida.setConfig({
        appName: 'markdown notes'
      });
      const veridaDApp = new Verida({
        chain: 'ethr',
        address: address[0],
        web3Provider: web3Provider
      });
      await veridaDApp.connect(true);
      const db = await veridaDApp.openDatabase('notes');
      const items = await db.getMany();
      setNotes(items)
      setAppData(veridaDApp)
    } catch (error) {
    } finally {
      setIsConnecting(false)
    }
  }


  return {
    initializeApp,
    isConnecting
  }
}

export default useAuthentication
