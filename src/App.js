import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AppLayouts from './layouts/appLayout';

import './libs';
import Routes from './routes/Routes';
import markDownServices from './api/services';
import { setMarkdownNotes } from './redux/reducers/editor';
import { setUserProfile } from './redux/reducers/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    markDownServices.on('error', (error) => {
      toast.error(error?.message);
    });

    markDownServices.on('notesChanged', (data) => {
      if (data && Array.isArray(data)) {
        dispatch(setMarkdownNotes(data));
      }
    });

    markDownServices.on('profileChanged', () => {
      dispatch(setUserProfile());
    });
  }, [dispatch]);

  return (
    <AppLayouts>
      <Routes />
    </AppLayouts>
  );
};

export default App;
