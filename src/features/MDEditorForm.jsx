import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import RichTextEditor from '../components/markdown/RichEditor';
import { AppContext } from '../contextApi/ContextProvider';
import useActions from '../hooks/useActions';
import BackDropLoader from '../components/appLoaders/BackDropLoader';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    '& > *': {
      margin: theme.spacing(2, 'auto'),
    },
  },
}));

const MDEditorForm = ({ showTitle }) => {
  const classes = useStyles();
  const [error, setError] = useState('')
  const { updateContent, postContent } = useActions();
  const {
    markdownVal,
    setMarkdownVal,
    isLoading,
    noteTitle,
    selectedNote,
    setNoteTitle,
    appData,
    setOpenPreview,
    toggleDrawer
  } = useContext(AppContext);


  const onSubmitNote = () => {
    if (!noteTitle || !markdownVal) {
      return setError('All Fields are required')
    };
    if (!appData) {
      return toast.warning('Please connect this App with the  verida datastore')
    };
    setError('')
    if (selectedNote) {
      const { title, body, ...rest } = selectedNote
      const editedItem = {
        title: noteTitle,
        body: markdownVal,
        ...rest,
      }
      updateContent(editedItem);
      setOpenPreview(false);
    } else {
      postContent({ title: noteTitle, markdownVal });
      toggleDrawer('right', false);
    }

  }

  return (
    <div className={classes.root}>
      {isLoading && <BackDropLoader load />}
      <Box justifyContent="space-between" display="flex">
        <Typography variant="h4" noWrap>
          {showTitle && 'Notes'}
        </Typography>
        <Button
          onClick={onSubmitNote}
          variant="contained"
          color="secondary"
        >
          {selectedNote ? 'Update' : 'Save'}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField onChange={(e) => {
        setNoteTitle(e.target.value)
      }} id="outlined-basic"
        fullWidth
        value={noteTitle}
        color="secondary"
        label="Note Title"
        variant="outlined" />
      <div>
        <RichTextEditor
          markdownVal={markdownVal}
          setMarkdownVal={setMarkdownVal}
        />
      </div>

    </div>
  );
}

export default MDEditorForm
