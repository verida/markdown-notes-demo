import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import markDownServices from '../api/services';
import { onConnecting, setUserProfile } from '../redux/reducers/auth';

const useConnect = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const connectVault = async () => {
    dispatch(onConnecting(true));
    try {
      await markDownServices.connectVault();
      if (markDownServices.profile) {
        dispatch(setUserProfile(markDownServices.profile));
        history.push('/');
      }
    } catch (error) {
      toast.error(markDownServices.error?.message);
      dispatch(onConnecting(false));
    } finally {
      dispatch(onConnecting(false));
    }
  };

  return {
    connectVault
  };
};

export default useConnect;
