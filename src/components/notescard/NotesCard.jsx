import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useActions from '../../hooks/useActions';
import { AppContext } from '../../contextApi/ContextProvider';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    background: "#FFFFFF",
    boxShadow: "0px 35px 45px rgba(7, 14, 39, 0.05)",
    borderRadius: "12px",
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
    margin: theme.spacing(1),
    padding: theme.spacing(1, 0.5),
  },
  loader: {
    width: '100%',
    position: 'absolute',
    right: '0',
    bottom: '0',
    borderRadius: "12px",
  }
}));

const NotesCard = ({ item }) => {
  const classes = useStyles();
  const { deleteContent, updateContent } = useActions();
  const { isLoading } = useContext(AppContext);
  const { toggleDrawer } = useContext(AppContext);
  const [itemId, setItemId] = useState('');


  const onFavorite = (note, type) => {
    const { isFavorite, ...rest } = note
    const editedItem = {
      isFavorite: type === 'add' ? true : false,
      ...rest,
    }
    updateContent(editedItem)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {item.title}
      </Typography>
      <div className={classes.bottom}>
        <div></div>
        <div>
          <IconButton

          >
            {item.isFavorite
              ? <StarIcon color="primary" onClick={() => {
                setItemId(item._id)
                onFavorite(item, 'remove')
              }} />
              : <StarBorderIcon color="primary" onClick={() => {
                setItemId(item._id)
                onFavorite(item, 'add')
              }} />
            }
          </IconButton>
          <IconButton
            onClick={toggleDrawer('right', true, item)}
          >
            <EditIcon />
          </IconButton>
          <IconButton disabled={isLoading}
            onClick={() => {
              setItemId(item._id)
              deleteContent(item)
            }
            }>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </div>
      </div>
      {
        isLoading
        && item._id === itemId
        && <div className={classes.loader}>
          <LinearProgress color="primary" />
        </div>
      }
    </div>
  )
}

export default NotesCard
