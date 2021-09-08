import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../contextApi/ContextProvider';
import appServices from '../api/services';

const useAuthentication = () => {
  const { setAppData, displayAvatar, setNotes, setIsLoading } = useContext(AppContext);

  const appInit = (data) => {
    if (data.error) {
      setIsLoading(false);
      return toast.error(data?.error?.message);
    }
    const { avatar } = data?.userProfile;
    setNotes(data.notes);
    setAppData(data.userProfile);
    displayAvatar(avatar);
    setIsLoading(false);
  };

  const initializeApp = () => {
    setIsLoading(true);
    appServices.connectVault(appInit);
  };

  return {
    initializeApp
  };
};

export default useAuthentication;
