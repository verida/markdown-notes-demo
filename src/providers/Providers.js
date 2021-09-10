import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ContextProvider from '../contextApi/ContextProvider';
import { shadows, palette } from '../theme';

const theme = createTheme({
  palette,
  shadows,
  shape: {
    borderRadius: 6
  },
  typography: {
    fontFamily: ["'Nunito Sans', sans-serif"].join(',')
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
  );
};

export default Providers;
