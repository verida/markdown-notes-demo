import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import veridaButtonImage from '../assets/images/connect_with_verida_dark.png';

import veridaLogo from '../assets/images/verida_logo.svg';
import useConnect from '../hooks/useConnect';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(313deg, rgba(237,236,251,1) 0%, rgba(142,137,226,1) 75%)',
    backdropFilter: 'blur(10px)'
  },
  button: {
    background: theme.palette.black
  },
  connectButton: {
    '&:disabled': {
      cursor: 'not-allowed'
    }
  },
  title: {
    fontWeight: 1000,
    fontSize: '28px',
    lineHeight: '36px',
    textAlign: 'center',
    margin: '5.25rem 0 0 0',
    color: '#111111'
  },
  contentBody: {
    lineHeight: '26px',
    textAlign: 'center',
    margin: '1rem 0 0 0',
    color: 'rgba(17, 17, 17, 0.8)'
  },
  container: {
    width: '24rem',
    height: '22.7rem',
    background: theme.palette.white,
    borderRadius: '12px',
    padding: '3rem 2.5rem',
    position: 'absolute',
    left: '50%',
    top: '40%',
    margin: theme.spacing(0, 'auto'),
    transform: 'translate(-50%,-50%)',
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)',
    [theme.breakpoints.down('sm')]: {
      width: '22rem'
    }
  }
}));

const ConnectVault = () => {
  const classes = useStyles();
  const state = useSelector((state) => state.webVault);
  const { connectVault: connect } = useConnect();

  return (
    <Box className={classes.root}>
      <Box
        className={classes.container}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <img className={classes.logo} src={veridaLogo} alt="logo" />
        <Typography className={classes.title} variant="h3">
          Connect now
        </Typography>
        <Typography className={classes.contentBody} variant="body1">
          Use the button below to connect with Verida Vault
        </Typography>
        <Box m={3}>
          <input
            className={classes.connectButton}
            disabled={state.connecting}
            onClick={connect}
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
    </Box>
  );
};

export default ConnectVault;
