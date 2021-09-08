/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { IconButton, SvgIcon, Typography } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { ReactComponent as StarIcon } from '../../assets/icons/star_filled.svg';
import UnFilledStarIcon from '../../assets/icons/Star_unfilled.svg';
import NotesAction from '../common/NotesActions';
import { setNoteTitle, setSelectedNote } from '../../redux/reducers/editor';

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
  },
  tableRow: {
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    '&:hover': {
      background: '#F5F5FC',
      height: '3rem',
      borderRadius: theme.shape.borderRadius
    }
  }
}));

export default function NoteTableDisplay() {
  const classes = useStyles();
  const { notes } = useSelector((state) => state.markdownEditor);
  const { app } = useSelector((state) => state.webVault);
  const history = useHistory();
  const dispatch = useDispatch();

  const navigateToDetailsPage = (item) => {
    dispatch(setSelectedNote(item));
    dispatch(setNoteTitle(item.title));
    history.push(`/editor?type=edit&id=${item._id}`);
  };

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
            {notes.map((row) => (
              <TableRow className={classes.tableRow} key={row.name}>
                <TableCell component="th" scope="row">
                  <Box
                    onClick={() => navigateToDetailsPage(row)}
                    component="span"
                    display="flex"
                    alignItems="center"
                  >
                    {row.isFavorite ? (
                      <IconButton>
                        <SvgIcon component={StarIcon} />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <img src={UnFilledStarIcon} alt="star" />
                      </IconButton>
                    )}
                    <span className={classes.listName}>{row.title}</span>
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  {app.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Moment fromNow>{row.modifiedAt}</Moment>
                </TableCell>
                <TableCell component="th" scope="row" />
                <TableCell component="th" scope="row">
                  <NotesAction item={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Mobile Version UI */}
      {notes.map((row) => (
        <Box className={classes.mobileUI} key={row.name}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box
              onClick={() => navigateToDetailsPage(row)}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <StarIcon />
              <span className={classes.listName}>{row.title}</span>
            </Box>
            <Box>
              <NotesAction item={row} />
            </Box>
          </Box>
          <Box display="flex">
            <Typography variant="subtitle1">
              <Moment fromNow>{row.modifiedAt}</Moment>
            </Typography>
            <Typography variant="subtitle1">Owner :{app.name}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
