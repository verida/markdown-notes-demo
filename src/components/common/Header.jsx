/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, IconButton, useMediaQuery } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import appLogo from '../../assets/images/verida_logo.svg';
import EditIcon from '../../assets/icons/Edit.svg';
import LinkIcon from '../../assets/icons/external_link.svg';
import StarIcon from '../../assets/icons/star_filled.svg';
import UnFilledStarIcon from '../../assets/icons/Star_unfilled.svg';
import UserAvatar from './UserAvatar';
import { setFavoriteItem, setNoteTitle } from '../../redux/reducers/editor';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 1)
  },
  title: {
    // flexGrow: 1,
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
      background: '#fff'
    }
  },
  starIcon: {
    margin: theme.spacing(-1, 0, 0, 0)
  },
  editIon: {}
}));

const AppHeader = () => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const matches = useMediaQuery('(max-width:768px)');
  const { app } = useSelector((state) => state.webVault);
  const { noteItem } = useSelector((state) => state.markdownEditor);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleTitle = (event) => {
    dispatch(setNoteTitle(event.target.value));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(setFavoriteItem(!isFavorite));
  };
  return (
    <div className={classes.root}>
      {!matches ? (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link to="/" className={classes.title}>
            <img className={classes.img} src={appLogo} alt="app" />
          </Link>
          {location.pathname === '/editor' && (
            <div>
              <input
                value={noteItem.title}
                onChange={handleTitle}
                style={{
                  border: 'none',
                  borderBottom: '3px white solid',
                  outline: 'none',
                  fontWeight: 600,
                  fontSize: '24px',
                  width: 100
                }}
              />
              {isFavorite ? (
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
          {app?.name && (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              {location.pathname === '/editor' ? (
                <div />
              ) : (
                <>
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
                </>
              )}
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
