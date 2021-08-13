import React  from 'react';
import AppLayouts from './layouts/appLayout';
import Providers from './providers/Providers';

import './libs';
import ErrorPage from './components/errorPage/ErrorPage';
import Routes from './routes/Routes';


const App = () => {

  return (
    <Providers>
      <AppLayouts>
        <ErrorPage />
       <Routes/>
      </AppLayouts>
    </Providers>
  )
}

export default App
