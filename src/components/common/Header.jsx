/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, IconButton, useMediaQuery } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import appLogo from '../../assets/images/verida_logo.svg';
// import EditIcon from '../../assets/icons/Edit.svg';
import LinkIcon from '../../assets/icons/external_link.svg';
import StarIcon from '../../assets/icons/star_filled.svg';
import UnFilledStarIcon from '../../assets/icons/Star_unfilled.svg';
import UserAvatar from './UserAvatar';
import { setFavoriteItem, setNoteTitle } from '../../redux/reducers/editor';
import { webLinks } from '../../constants';
import markDownServices from '../../api/services';
import { setUserProfile } from '../../redux/reducers/auth';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    color: theme.palette.white
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
  img: {},
  logoMobile: {
    margin: 'auto'
  },
  links: {
    color: '#687085',
    background: '#fff',
    textTransform: 'capitalize',
    margin: theme.spacing(0, 2),
    '&:hover': {
      background: '#fff',
      color: '#041133'
    }
  },
  starIcon: {
    margin: theme.spacing(-1, 0, 0, 0)
  },
  editIon: {},
  inputClass: {
    border: 'none',
    borderBottom: '3px white solid',
    outline: 'none',
    fontWeight: 600,
    fontSize: '24px',
    width: 190
  }
}));

const AppHeader = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  const { app } = useSelector((state) => state.webVault);
  const { noteItem } = useSelector((state) => state.markdownEditor);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleTitle = (event) => {
    dispatch(setNoteTitle(event.target.value));
  };

  const handleFavorite = () => {
    dispatch(setFavoriteItem());
  };

  useEffect(() => {
    markDownServices.on('profileChanged', (profile) => {
      dispatch(setUserProfile(profile));
    });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {!matches ? (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link to="/" className={classes.title}>
            <img className={classes.img} src={appLogo} alt="app" />
          </Link>
          {location.pathname === '/editor' && (
            <div>
              <input value={noteItem.title} onChange={handleTitle} className={classes.inputClass} />
              {noteItem.isFavorite ? (
                <IconButton className={classes.starIcon} onClick={handleFavorite}>
                  <img src={StarIcon} alt="star-icon" />
                </IconButton>
              ) : (
                <IconButton className={classes.starIcon} onClick={handleFavorite}>
                  <img src={UnFilledStarIcon} alt="star" />
                </IconButton>
              )}
            </div>
          )}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {location.pathname === '/editor' ? (
              <div />
            ) : (
              <>
                <Button
                  href={webLinks.DOCUMENTATION}
                  className={classes.links}
                  target="_blank"
                  startIcon={<img alt="link" src={LinkIcon} />}
                >
                  Documentation
                </Button>
                <Button
                  href={webLinks.WEBSITE}
                  target="_blank"
                  className={classes.links}
                  startIcon={<img alt="link" src={LinkIcon} />}
                >
                  Verida website
                </Button>
              </>
            )}
            <span className={classes.profile}>{app?.name}</span>
            <UserAvatar />
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img className={classes.logoMobile} src={appLogo} alt="app" />
          {/* <img className={classes.editIon} src={EditIcon} alt="edit" /> */}
          <UserAvatar />
        </Box>
      )}
    </div>
  );
};

export default AppHeader;
