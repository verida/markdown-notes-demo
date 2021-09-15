import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import markDownServices from '../api/services';
import { onConnecting, onSuccessLogin } from '../redux/reducers/auth';
import { setMarkdownNotes } from '../redux/reducers/editor';

const useConnect = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const authCb = async () => {
    if (markDownServices.error?.message) {
      dispatch(onConnecting());
      return;
    }

    const filterOptions = {
      limit: 40,
      skip: 0,
      sort: [{ title: 'desc' }]
    };
    const notes = await markDownServices.fetchAllNotes({}, filterOptions);
    const profile = await markDownServices.getUserProfile();
    dispatch(setMarkdownNotes(notes));
    dispatch(onSuccessLogin(profile));
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
