import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { markdownActions, markdownApi } from '../../../redux/reducers/editor';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 1rem'
  },
  body: {
    margin: '1rem  0 1.5rem 0'
  },
  cancelBtn: {
    marginRight: '1rem'
  },
  actions: {
    '&> *': {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'capitalize'
    }
  }
}));

const DeleteNote = ({ item, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    const data = {
      type: markdownActions.DELETE,
      data: item
    };
    dispatch(markdownApi(data));
  };
  return (
    <Box className={classes.root}>
      <Typography className={classes.body} variant="body1">
        {item.title}
        will be deleted forever. If this note is shared, collaborators won’t be able to access it
        anymore
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <div />
        <Box className={classes.actions}>
          <Button
            className={classes.cancelBtn}
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="primary">
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeleteNote;
