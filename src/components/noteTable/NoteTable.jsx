import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { Typography } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { ReactComponent as StarIcon } from '../../assets/icons/star_filled.svg';
import NotesAction from '../common/NotesActions';
import { reduceStringLength } from '../../helpers/Editor.helpers';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  listName: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    lineHeight: '150%',
    color: '#041133',
    flex: 'none',
    order: 1,
    flexGrow: 0,
    margin: '0rem 0.75rem'
  },
  tableContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobileUI: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0)
];

export default function NoteTableDisplay() {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Edited</TableCell>
              <TableCell>Shared with</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Box component="span" display="flex" alignItems="center">
                    <StarIcon />
                    <span className={classes.listName}>Note from the last meeting</span>
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  Floyd Miles
                </TableCell>
                <TableCell component="th" scope="row">
                  5 days ago
                </TableCell>
                <TableCell component="th" scope="row">
                  Marci Senter, Annabel Rohan
                </TableCell>
                <TableCell component="th" scope="row">
                  <NotesAction />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Mobile Version UI */}
      {rows.map((row) => (
        <Box className={classes.mobileUI} key={row.name}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <StarIcon />
              <span className={classes.listName}>
                {reduceStringLength('Note from the last meeting he last meeting', 30)}
              </span>
            </Box>
            <Box>
              <NotesAction />
            </Box>
          </Box>
          <Box display="flex">
            <Typography variant="subtitle1">5 days ago</Typography>
            <Typography variant="subtitle1">Owner : Chris Were</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
