import React, { createContext, useState } from 'react';

export const AppContext = createContext()

const ContextProvider = ({ children }) => {
  const [appData, setAppData] = useState();


  const values ={
    appData,
    setAppData
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
