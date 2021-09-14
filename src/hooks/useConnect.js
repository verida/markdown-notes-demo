import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import markDownServices from '../api/services';
import { onConnecting, onSuccessLogin } from '../redux/reducers/auth';

const useConnect = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const authCb = (data) => {
    if (markDownServices.error?.message) {
      toast.error(data?.error?.message);
      dispatch(onConnecting());
      return;
    }
    dispatch(onSuccessLogin(data));
    history.push('/');
  };

  const connectVault = () => {
    dispatch(onConnecting());
    markDownServices.connectVault(authCb);
  };

  return {
    connectVault
  };
};

export default useConnect;
