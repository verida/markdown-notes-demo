import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useActions from '../../hooks/useActions';
import { AppContext } from '../../contextApi/ContextProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    background: '#FFFFFF',
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)',
    borderRadius: '12px',
    height: 100,
    width: '100%',
    margin: theme.spacing(1, 'auto'),
    boxSizing: 'border box'
  },
  bottom: {
    position: 'absolute',
    right: '0',
    bottom: '0'
  },
  title: {
    borderRadius: '12px 12px 0px 0px',
    padding: theme.spacing(1.5, 1),
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid #ccc',
      background: '#eeeeee'
    }
  },
  loader: {
    width: '100%',
    position: 'absolute',
    right: '0',
    bottom: '0',
    borderRadius: '12px'
  }
}));

const NotesCard = ({ item }) => {
  const classes = useStyles();
  const { deleteContent, updateContent } = useActions();
  const { openMarkDownView, isLoading } = useContext(AppContext);
  const [itemId, setItemId] = useState('');

  const reduceText = (value) => (value.length > 30 ? `${value.substr(0, 30)}...` : value);

  const onFavorite = (note, type) => {
    const { isFavorite, ...rest } = note;
    const editedItem = {
      isFavorite: type === 'add',
      ...rest
    };
    updateContent(editedItem);
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        onClick={() => {
          openMarkDownView(true, item);
        }}
        className={classes.title}
      >
        {reduceText(item.title)}
      </Typography>
      <div className={classes.bottom}>
        <div />
        <div>
          {item.isFavorite ? (
            <IconButton
              onClick={() => {
                setItemId(item._id);
                onFavorite(item, 'remove');
              }}
            >
              <StarIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setItemId(item._id);
                onFavorite(item, 'add');
              }}
            >
              <StarBorderIcon color="primary" />
            </IconButton>
          )}
          <IconButton
            disabled={isLoading}
            onClick={() => {
              setItemId(item._id);
              deleteContent(item);
            }}
          >
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </div>
      </div>
      {isLoading && item._id === itemId && (
        <div className={classes.loader}>
          <LinearProgress color="primary" />
        </div>
      )}
    </div>
  );
};

export default NotesCard;
