import { useContext, useState } from 'react';
import Verida from '@verida/datastore';
import { AppContext } from '../contextApi/ContextProvider'

const useAuthentication = () => {
  const { setAppData } = useContext(AppContext);
  const [isConnecting, setIsConnecting] = useState(true);


  const initializeApp = async () => {
    setIsConnecting(true)
    try {
      const web3Provider = await Verida.Helpers.wallet.connectWeb3('ethr');
      const address = await web3Provider.instance.eth.getAccounts()
      console.log(address);
      Verida.setConfig({
        appName: 'markdown notes'
      });
      const veridaDApp = new Verida({
        chain: 'ethr',
        address: address[0],
        web3Provider: web3Provider
      });
       let connected = await veridaDApp.connect(true);
      console.log(veridaDApp)
      setAppData(veridaDApp)
      console.log(connected);
    } catch (error) {
      console.log(error)
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
