/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Container } from '@material-ui/core';
import Store from '../utils/store';
import { VERIDA_USER_SIGNATURE } from '../constants';
import AppHeader from '../components/common/Header';
import veridaLogo from '../assets/images/verida_logo.svg';
import useConnect from '../hooks/useConnect';
import { onConnecting } from '../redux/reducers/auth/index';

const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    background: theme.palette.white
  },
  appBar: {
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)',
    background: theme.palette.gradient,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)'
  },
  drawerOpen: {
    width: drawerWidth,
    background: theme.palette.black,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    background: theme.palette.black,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(2.4, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    margin: '2.7rem  0 0 0'
  },
  button: {
    background: theme.palette.black
  },
  authRoot: {
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(313deg, rgba(237,236,251,1) 0%, rgba(142,137,226,1) 75%)',
    backdropFilter: 'blur(10px)'
  },
  authContainer: {
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

const AppLayouts = ({ children }) => {
  const classes = useStyles();
  const { connecting, connected } = useSelector((state) => state.webVault);
  const { connectVault } = useConnect();

  const decryptedSignature = Store.get(VERIDA_USER_SIGNATURE);

  const dispatch = useDispatch();

  const modal = document.getElementById('verida-modal');
  const closeModal = document.getElementById('verida-modal-close');

  const handleClickAway = (event) => {
    if (
      (event.target === modal && modal !== null) ||
      (event.target === closeModal && closeModal !== null)
    ) {
      dispatch(onConnecting());
      modal.style.display = 'none';
    }
  };

  useEffect(() => {
    if (decryptedSignature) {
      connectVault();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClickAway);

    return () => {
      window.removeEventListener('click', handleClickAway);
    };
  }, [connecting]);

  if (connecting) {
    return (
      <Box className={classes.authRoot}>
        <Box
          className={classes.authContainer}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <img className={classes.logo} src={veridaLogo} alt="logo" />
          <Box
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            paddingY={2}
            fontSize={20}
            fontWeight={600}
          >
            Connecting...
            <CircularProgress color="primary" />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      {connected ? (
        <>
          <AppBar color="inherit" position="fixed" className={clsx(classes.appBar)}>
            <Container fixed>
              <AppHeader />
            </Container>
          </AppBar>
          <Container fixed>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
          </Container>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default AppLayouts;
