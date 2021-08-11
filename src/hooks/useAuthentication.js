import { useContext, useState } from 'react';
import { AppContext } from '../contextApi/ContextProvider'
import appServices from '../api/services';

const useAuthentication = () => {
  const { setAppData, startUp } = useContext(AppContext);
  const [isConnecting, setIsConnecting] = useState(false);


  const initializeApp =  () => {
    startUp()
    setIsConnecting(true)
    appServices.connectVault()
    .then(data => {
      setAppData(data)
    })
    .finally(()=> setIsConnecting(false))
  }

  return {
    initializeApp,
    isConnecting
  }
}

export default useAuthentication
