import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { AppContext } from '../contextApi/ContextProvider';
import appLogo from '../assets/images/verida_logo.svg'
import { Avatar, Container, IconButton } from '@material-ui/core';
import PopOverMenu from '../components/popover/Popover';
import LayoutDrawer from './layoutDrawer';
import Store from '../utils/store';
import { USER_SESSION_KEY } from '../constants';


const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    boxShadow: "0px 35px 45px rgba(7, 14, 39, 0.05)",
    background: theme.palette.gradient,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: "0px 35px 45px rgba(7, 14, 39, 0.05)",
  },
  drawerOpen: {
    width: drawerWidth,
    background: '#37D5C7',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: '#37D5C7',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    background: theme.palette.black,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.white,
    margin: theme.spacing(0.4, 0, 0, 0),
  },
  profile: {
    margin: theme.spacing(0, 1.4),
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  img: {
    margin: theme.spacing(0.8, 0, 0, 0),
  }
}));


const AppLayouts = ({ children }) => {
  const classes = useStyles();
  const { appData, avatar } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  const isConnected = Store.get(USER_SESSION_KEY)


  const handleDrawerOpen = () => {
    setOpen(true);
  };


  return (
    <div className={classes.root}>
      <AppBar
        style={{
          boxShadow: "0px 35px 45px rgba(7, 14, 39, 0.05)"
        }}
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {isConnected &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography
            className={classes.title} variant="h5" noWrap>
            <img className={classes.img} src={appLogo} alt="app" />
          </Typography>
          {appData?.name &&
            <>
              <span className={classes.profile}> {appData?.name}</span>
              <Avatar
                alt={appData?.name}
                src={avatar}
              />
              <PopOverMenu />
            </>
          }
        </Toolbar>
      </AppBar>
      {isConnected && <LayoutDrawer classes={classes} open={open} setOpen={setOpen} />}
      <Container fixed>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </Container>
    </div>
  );
}



export default AppLayouts;