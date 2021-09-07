/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, IconButton, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import appLogo from '../../assets/images/verida_logo.svg';
import EditIcon from '../../assets/icons/Edit.svg';
import LinkIcon from '../../assets/icons/external_link.svg';
import UserAvatar from './UserAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 1)
  },
  title: {
    flexGrow: 1,
    color: theme.palette.white,
    margin: theme.spacing(0, 0, 0, 8)
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
    margin: theme.spacing(0, 0, 0, 0)
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
  editIon: {}
}));

const AppHeader = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  const { app } = useSelector((state) => state.webVault);

  return (
    <div className={classes.root}>
      {!matches ? (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link to="/" className={classes.title}>
            <img className={classes.img} src={appLogo} alt="app" />
          </Link>

          {app?.name && (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Button
                href="https://docs.datastore.verida.io/#/"
                className={classes.links}
                target="_blank"
                startIcon={<img alt="link" src={LinkIcon} />}
              >
                Documentation
              </Button>
              <Button
                href="https://www.verida.io/"
                target="_blank"
                className={classes.links}
                startIcon={<img alt="link" src={LinkIcon} />}
              >
                Verida website
              </Button>
              <span className={classes.profile}>{app.name}</span>
              <UserAvatar />
            </Box>
          )}
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img className={classes.logoMobile} src={appLogo} alt="app" />
          <img className={classes.editIon} src={EditIcon} alt="edit" />
        </Box>
      )}
    </div>
  );
};

export default AppHeader;
