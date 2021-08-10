import React from 'react'
import AppLayouts from './layouts/appLayout'
import Providers from './providers/Providers'
import Home from './views/Home';



import './libs'
import ErrorPage from './components/errorPage/ErrorPage';


const App = () => {
  return (
    <Providers>
      <AppLayouts>
        <ErrorPage />
        <Home />
      </AppLayouts>
    </Providers>
  )
}

export default App
