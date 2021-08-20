import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ContextProvider from '../contextApi/ContextProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#112D57',
      light:'#37D5C7',
      gradient: "linear-gradient(91.26deg, rgba(55, 213, 199, 0.8) 12.36%, rgba(255, 0, 204, 0.8) 36.84%, rgba(55, 213, 199, 0.8) 69.13%, rgba(201, 105, 174, 0.8) 94.13%)"
    },
    black: '#000',
    white: '#fff',
    secondary: {
      main: '#000',
    },
  },
  shape: {
    borderRadius: 6
  }
});

const Providers = ({ children }) => {

  return (
    <Router>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </ContextProvider>
    </Router>
  )
}

export default Providers
