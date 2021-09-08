/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box, Button, IconButton, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import appLogo from '../../assets/images/verida_logo.svg';
import EditIcon from '../../assets/icons/Edit.svg';
import LinkIcon from '../../assets/icons/external_link.svg';
import UserAvatar from './UserAvatar';

const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  title: {
    flexGrow: 1,
    color: theme.palette.white,
    margin: theme.spacing(0.4, 0, 0, 0)
  },
  profile: {
    margin: theme.spacing(0, 1.4, 0, 6),
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '150%',
    color: '#041133',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  img: {
    margin: theme.spacing(0.8, 0, 0, 0)
  },
  logoMobile: {
    margin: 'auto'
  },
  links: {
    color: '#687085',
    textTransform: 'capitalize',
    margin: theme.spacing(0, 2),
    '&:hover': {
      background: '#fff'
    }
  },
  editIon: {
    // background: theme.palette.primary.main,
    // color: '#fff'
  }
}));

const AppHeader = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  const [open] = React.useState(false);

  return (
    <div className={classes.root}>
      {!matches ? (
        <AppBar
          style={{
            boxShadow: '0px 4px 15px rgba(17, 45, 87, 0.05)'
          }}
          color="inherit"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <Typography className={classes.title} variant="h5" noWrap>
              <img className={classes.img} src={appLogo} alt="app" />
            </Typography>
            {'Francesca W. ' && (
              <>
                <Box>
                  <Button className={classes.links} startIcon={<img alt="link" src={LinkIcon} />}>
                    Documentation
                  </Button>
                  <Button className={classes.links} startIcon={<img alt="link" src={LinkIcon} />}>
                    Verida website
                  </Button>
                </Box>
                <span className={classes.profile}>Francesca W.</span>
                <UserAvatar />
              </>
            )}
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          elevation={0}
          color="inherit"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton>
              <MenuIcon />
            </IconButton>
            <img className={classes.logoMobile} src={appLogo} alt="app" />
            <img className={classes.editIon} src={EditIcon} alt="edit" />
          </Box>
        </AppBar>
      )}
    </div>
  );
};

export default AppHeader;
