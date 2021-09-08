import React from 'react';
import AppLayouts from './layouts/appLayout';
import Providers from './providers/Providers';

import './libs';
import './assets/styles/global.styles.css';
import Routes from './routes/Routes';

const App = () => {
  return (
    <Providers>
      <AppLayouts>
        <Routes />
      </AppLayouts>
    </Providers>
  );
};

export default App;
