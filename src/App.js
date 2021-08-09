import React from 'react'
import AppLayouts from './layouts/appLayout'
import Providers from './providers/Providers'
import Home from './views/Home';


const App = () => {
  return (
    <Providers>
      <AppLayouts>
        <Home />
      </AppLayouts>
    </Providers>
  )
}

export default App
