import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AppLayouts from './layouts/appLayout';

import './libs';
import Routes from './routes/Routes';
import markDownServices from './api/services';
import { setMarkdownNotes } from './redux/reducers/editor';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    markDownServices.on('onError', (error) => {
      toast.error(error?.message);
    });

    markDownServices.on('onNoteChanged', (data) => {
      dispatch(setMarkdownNotes(data));
    });
  }, [dispatch]);

  return (
    <AppLayouts>
      <Routes />
    </AppLayouts>
  );
};

export default App;
