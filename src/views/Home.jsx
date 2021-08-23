/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import NotesCard from '../components/notescard/NotesCard';
import MDEditorForm from '../features/MDEditorForm';
import { AppContext } from '../contextApi/ContextProvider';
import ModalAlert from '../components/modalAlert/ModalAlert';
import ModalPreview from '../features/ModalPreview';
import { makeStyles } from '@material-ui/core';
import { USER_SESSION_KEY } from '../constants';
import Store from '../utils/store';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0)
  },
}));

const Home = () => {
  const {
    notes,
    openPreview,
    appData,
    setOpenPreview,
    setNoteTitle,
    setMarkdownVal,
    setSelectedNote
  } = useContext(AppContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const isConnected = Store.get(USER_SESSION_KEY);


  const openModal = () => {
    setNoteTitle('');
    setMarkdownVal('');
    setSelectedNote('');
    setOpen(!open)
  }

  return (
    <div>
      <ModalAlert open={openPreview} setOpen={setOpenPreview} >
        <ModalPreview />
      </ModalAlert>
      <ModalAlert open={open} setOpen={setOpen} >
        <MDEditorForm showTitle />
      </ModalAlert>
      {appData?.name && <Button
        size="large"
        className={classes.button}
        endIcon={<AddIcon />}
        variant="outlined"
        color="secondary"
        onClick={openModal}>
        Add Note
      </Button>}
      {notes && isConnected
        &&
        <Grid container spacing={2}>
          {notes.map(list => (
            <Grid item md={4} sm={12} xs={12} key={list._id}>
              <NotesCard item={list} />
            </Grid>
          ))}
        </Grid>
      }
    </div>
  )
}

export default Home;
