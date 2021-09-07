import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import markDownServices from '../api/services';
import veridaButtonImage from '../assets/images/connect_with_verida_dark.png';
import { onConnecting, onSuccessLogin } from '../redux/reducers/auth';
import { setMarkdownNotes } from '../redux/reducers/editor';

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.black
  },
  connectButton: {
    '&:disabled': {
      cursor: 'not-allowed'
    }
  }
}));

const ConnectVault = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.webVault);

  const appInit = (data) => {
    // Todo: Fix Dispatch actions class

    if (data?.error) {
      toast.error(data?.error?.message);
      return;
    }
    dispatch(onSuccessLogin(data));
    dispatch(setMarkdownNotes(data.notes));
    dispatch(onConnecting());
    history.push('/');
  };

  const initializeApp = () => {
    markDownServices.connectVault(appInit);
  };

  useEffect(() => {
    history.push('/');
  }, [history]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Box m={2}>
        <Typography variant="h5">
          Click on the button to connect
          {/* <br /> */}
          with your vault to use Markdown Notes
        </Typography>
      </Box>
      <Box m={3}>
        <input
          className={classes.connectButton}
          disabled={state.connecting}
          onClick={initializeApp}
          type="image"
          src={veridaButtonImage}
          alt="button"
        />
      </Box>
      {state.connecting && (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          connecting...
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default ConnectVault;
