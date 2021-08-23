/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import NotesCard from '../components/notescard/NotesCard';
import MDEditorForm from '../features/MDEditorForm';
import { AppContext } from '../contextApi/ContextProvider';
import ModalAlert from '../components/modalAlert/ModalAlert';
import ModalPreview from '../features/ModalPreview';
import { makeStyles } from '@material-ui/core';
import { USER_SESSION_KEY } from '../constants';
import Store from '../utils/store';
import useAuthentication from '../hooks/useAuthentication';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0)
  },
  cardView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: theme.spacing(2, 'auto'),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  cardContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1.5, 0),
      padding: theme.spacing(1.4, 1),
    }
  },
  connectButton: {
    fontWeight: 600
  }

}));

const Home = () => {
  const {
    notes,
    openPreview,
    isLoading,
    setIsLoading,
    setOpenPreview,
    setNoteTitle,
    setMarkdownVal,
    setSelectedNote
  } = useContext(AppContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    initializeApp,
  } = useAuthentication()



  const modal = document.getElementById('verida-modal');
  const closeModal = document.getElementById('verida-modal-close');

  const handleClickAway = (event) => {
    if ((event.target === modal && modal !== null)
      || (event.target === closeModal && closeModal !== null)) {
      modal.style.display = 'none';
      setIsLoading(false)
    }

  };

  React.useEffect(() => {
    window.addEventListener('click', handleClickAway);


    return () => {
      window.removeEventListener('click', handleClickAway);
    };
  }, [isLoading]);

  const isConnected = Store.get(USER_SESSION_KEY)
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
      {!isConnected ?
        <Card className={classes.cardView}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" color="primary">
              Click on the  button to connect with your vault <br />
              to use Markdown Notes
            </Typography>
            <Button
              fullWidth
              variant="contained"
              disabled={isLoading}
              onClick={initializeApp}
              className={classes.connectButton}
              color="primary"
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </Button>
          </CardContent>
        </Card> :
        <Button
          size="large"
          className={classes.button}
          endIcon={<AddIcon />}
          variant="outlined"
          color="secondary"
          onClick={openModal}>
          Add Note
        </Button>
      }
      {notes.length && isConnected
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
