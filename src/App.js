import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AppLayouts from './layouts/appLayout';

import './libs';
import Routes from './routes/Routes';
import markDownServices from './api/services';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    markDownServices.on('error', (error) => {
      toast.error(error?.message);
    });
  }, [dispatch]);

  return (
    <AppLayouts>
      <Routes />
    </AppLayouts>
  );
};

export default App;
