import { useContext, useState } from 'react';
import { AppContext } from '../contextApi/ContextProvider'
import appServices from '../api/services';
import { toast } from 'react-toastify';

const useAuthentication = () => {
  const {
    setAppData,
    displayAvatar,
    setNotes
  } = useContext(AppContext);
  const [isConnecting, setIsConnecting] = useState(false);


  const appInit = (data) => {
    if (data?.error) {
      setIsConnecting(false)
      return toast.error(data?.error?.message)
    }
    const { avatar } = data?.userProfile
    setNotes(data.notes);
    setAppData(data.userProfile)
    displayAvatar(avatar)
    setIsConnecting(false)
  }

  const initializeApp = () => {
    setIsConnecting(true)
    appServices.connectVault(appInit)
  }

  return {
    initializeApp,
    isConnecting
  }
}

export default useAuthentication
