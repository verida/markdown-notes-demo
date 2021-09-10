import React, { useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import StarIcon from '../../../assets/icons/star_filled.svg';
import UnFilledStarIcon from '../../../assets/icons/Star_unfilled.svg';
import { markdownActions, markdownApi } from '../../../redux/reducers/editor';
import { AppSnackBar } from '../../index';

const useStyles = makeStyles((theme) => ({
  starIcon: {
    margin: theme.spacing(0, -1)
  }
}));

const FavoriteIcon = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [snackPack, setSnackPack] = useState(false);

  const handleFavorite = () => {
    const { isFavorite, ...rest } = item;
    const selectedItem = {
      data: {
        isFavorite: !item.isFavorite,
        ...rest
      },
      type: markdownActions.PATCH
    };
    dispatch(markdownApi(selectedItem));
    setSnackPack(true);
  };
  return (
    <>
      {setSnackPack && (
        <AppSnackBar
          messageInfo={!item.isFavorite ? 'unmarked as favorite' : 'marked as favorite'}
          setSnackPack={setSnackPack}
          snackPack={snackPack}
        />
      )}
      {item.isFavorite ? (
        <IconButton className={classes.starIcon} onClick={handleFavorite}>
          <img src={StarIcon} alt="star-icon" />
        </IconButton>
      ) : (
        <IconButton className={classes.starIcon} onClick={handleFavorite}>
          <img src={UnFilledStarIcon} alt="star" />
        </IconButton>
      )}
    </>
  );
};

export default FavoriteIcon;
