import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import markDownServices from '../../../api/services';

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
    borderRadius: '6px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: theme.spacing(0.7, 'auto')
    }
  }
}));

const EditName = ({ item, setOpen }) => {
  const classes = useStyles();
  const [titleName, setTitleName] = useState(item.title);

  const handleEdit = (event) => {
    event.preventDefault();
    const data = {
      title: titleName,
      _id: item._id
    };
    markDownServices.updateNote(data);
    setOpen(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" className={classes.root}>
      <form onSubmit={handleEdit}>
        <input
          onChange={(e) => setTitleName(e.target.value)}
          className={classes.input}
          id="outlined-basic"
          value={titleName}
          type="text"
          required
        />
        <Button type="submit" className={classes.button} variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditName;
