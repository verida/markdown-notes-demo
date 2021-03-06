/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import NotesAction from '../common/editorActions/NotesActions';
import { setNoteItem, setSelectedNote } from '../../redux/reducers/editor';
import { noteActionsType } from '../../utils/common.utils';
import { DeleteNote, EditName, Sharing } from '../common/editorActions';
import AppModalUi from '../modal/AppModal';
import FavoriteIcon from '../common/editorActions/FavoriteIcon';

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
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({
    title: 'delete',
    type: '',
    item: {}
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const navigateToDetailsPage = (item) => {
    dispatch(setSelectedNote(item));
    dispatch(setNoteItem(item));
    history.push(`/editor?type=edit&id=${item._id}`);
  };

  const renderActionUi = () => {
    switch (action.type) {
      case noteActionsType.RENAME:
        return <EditName item={action.item} setOpen={setOpen} />;
      case noteActionsType.DELETE:
        return <DeleteNote item={action.item} setOpen={setOpen} />;
      case noteActionsType.SHARE:
        return <Sharing />;
      default:
        return <EditName item={action.item} setOpen={setOpen} />;
    }
  };

  return (
    <>
      <AppModalUi open={open} setOpen={setOpen} title={action.title}>
        {renderActionUi()}
      </AppModalUi>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Edited</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((row) => (
              <TableRow className={classes.tableRow} key={row._id}>
                <TableCell component="th" scope="row">
                  <Box component="span" display="flex" alignItems="center">
                    <FavoriteIcon item={row} />
                    <span
                      aria-hidden="true"
                      onClick={() => navigateToDetailsPage(row)}
                      className={classes.listName}
                    >
                      {row.title}
                    </span>
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  {app?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Moment fromNow>{row.modifiedAt}</Moment>
                </TableCell>
                <TableCell component="th" scope="row">
                  <NotesAction setAction={setAction} setOpen={setOpen} item={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Mobile Version UI */}
      {notes.map((row) => (
        <Box className={classes.mobileUI} key={row._id}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <FavoriteIcon item={row} />
              <span
                aria-hidden="true"
                onClick={() => navigateToDetailsPage(row)}
                className={classes.listName}
              >
                {row.title}
              </span>
            </Box>
            <Box>
              <NotesAction etAction={setAction} setOpen={setOpen} item={row} />
            </Box>
          </Box>
          <Box display="flex">
            <Typography variant="subtitle1">
              <Moment fromNow>{row.modifiedAt}</Moment>
            </Typography>
            <Typography variant="subtitle1">Owner :{app?.name}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
