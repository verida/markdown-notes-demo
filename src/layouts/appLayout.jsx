/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from '@material-ui/core';
import Store from '../utils/store';
import { VERIDA_USER_SIGNATURE } from '../constants';
import AppHeader from '../components/common/Header';
import markDownServices from '../api/services';
import { onConnecting, onSuccessLogin } from '../redux/reducers/auth';
import { setMarkdownNotes } from '../redux/reducers/editor';

const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    margin: '2.7rem  0 0 0'
  },
  button: {
    background: theme.palette.black
  }
}));

const AppLayouts = ({ children }) => {
  const classes = useStyles();
  const [open] = React.useState(false);
  const { app } = useSelector((state) => state.webVault);

  const decryptedSignature = Store.get(VERIDA_USER_SIGNATURE);

  const dispatch = useDispatch();

  const modal = document.getElementById('verida-modal');
  const closeModal = document.getElementById('verida-modal-close');

  const handleClickAway = (event) => {
    if (
      (event.target === modal && modal !== null) ||
      (event.target === closeModal && closeModal !== null)
    ) {
      modal.style.display = 'none';
    }
  };

  const appInit = (data) => {
    // Todo: Fix Dispatch actions class
    if (data?.error) {
      toast.error(data?.error?.message);
      return;
    }
    dispatch(onSuccessLogin(data));
    dispatch(setMarkdownNotes(data.notes));
    dispatch(onConnecting());
  };

  useEffect(() => {
    if (decryptedSignature) {
      markDownServices.connectVault(appInit);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClickAway);

    return () => {
      window.removeEventListener('click', handleClickAway);
    };
  }, []);

  return (
    <div className={classes.root}>
      {app && (
        <AppBar
          color="inherit"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Container fixed>
            <AppHeader />
          </Container>
        </AppBar>
      )}
      {app ? (
        <Container fixed>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </Container>
      ) : (
        children
      )}
    </div>
  );
};

export default AppLayouts;
