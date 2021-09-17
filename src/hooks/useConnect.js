import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import markDownServices from '../api/services';
import { onConnecting } from '../redux/reducers/auth';

const useConnect = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const authCb = async () => {
    if (markDownServices.error?.message) {
      dispatch(onConnecting());
      return;
    }

    dispatch(onConnecting());

    history.push('/');
  };

  const connectVault = async () => {
    dispatch(onConnecting());

    await markDownServices.initApp();
    authCb();
  };

  return {
    connectVault
  };
};

export default useConnect;
