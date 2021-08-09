import { makeStyles } from '@material-ui/core';
import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


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



const NotesCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Title Here
      </Typography>
      <div className={classes.bottom}>
        <div></div>
        <div>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default NotesCard
