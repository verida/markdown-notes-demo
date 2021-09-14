import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { shadows, palette } from '../theme';
import store from '../redux/store';

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
    <ReduxProvider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </Router>
    </ReduxProvider>
  );
};

export default Providers;
