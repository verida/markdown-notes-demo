import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SearchBar from '../searchBar/SearchBar';
import FiltersUI from './components/Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2.5rem 0 2rem 0',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      flexDirection: 'row-reverse',
      '& > *': {
        flexBasis: '100%'
      }
    }
  }
}));

const SortBarPanel = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} display="flex" justifyContent="space-between" alignItems="center">
      <FiltersUI />
      <SearchBar />
    </Box>
  );
};

export default SortBarPanel;
