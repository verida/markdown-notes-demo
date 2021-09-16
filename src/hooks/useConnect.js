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

    dispatch(onConnecting());
    dispatch(onSuccessLogin());

    history.push('/');
  };

  const connectVault = async () => {
    markDownServices.on('notesChanged', (notes) => {
      dispatch(setMarkdownNotes(notes));
    });

    await markDownServices.initApp();

    authCb();
  };

  return {
    connectVault
  };
};

export default useConnect;
