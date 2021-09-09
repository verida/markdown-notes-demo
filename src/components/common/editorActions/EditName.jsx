import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { markdownActions, markdownApi } from '../../../redux/reducers/editor';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem 1.5rem 2rem 1.5rem',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  input: {
    padding: '6px 16px',
    width: '335px',
    height: '40px',
    background: '#F7F8F9',
    border: '1px solid #423BCE',
    boxShadow: '0px 0px 4px rgba(66, 59, 206, 0.3)',
    borderRadius: '6px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  button: {
    padding: '0px 24px',
    height: '40px',
    background: '#36415C',
    opacity: 0.5,
    borderRadius: '6px',
    color: theme.palette.white,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: theme.spacing(0.7, 'auto')
    }
  }
}));

const EditName = ({ item }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(item.title);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const noteData = {
      data: {
        ...item,
        title
      },
      type: markdownActions.PATCH
    };
    dispatch(markdownApi(noteData));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" className={classes.root}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className={classes.input}
        id="outlined-basic"
        value={title}
        type="text"
      />
      <Button className={classes.button} onClick={handleEdit} variant="contained" color="inherit">
        Save Changes
      </Button>
    </Box>
  );
};

export default EditName;
