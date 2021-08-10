import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useActions from '../../hooks/useActions';
import { AppContext } from '../../contextApi/ContextProvider';
import BackDropLoader from '../appLoaders/BackDropLoader';


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
  }
}));



const NotesCard = ({ item }) => {
  const classes = useStyles();
  const { deleteContent } = useActions();
  const { isLoading } = useContext(AppContext);
  const { toggleDrawer } = useContext(AppContext);

  return (
    <div className={classes.root}>
      {isLoading && <BackDropLoader load />}
      <Typography variant="h6" className={classes.title}>
        {item.title}
      </Typography>
      <div className={classes.bottom}>
        <div></div>
        <div>
          <IconButton
            onClick={toggleDrawer('right', true, item)}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteContent(item)}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default NotesCard
