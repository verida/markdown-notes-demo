import React, { useState } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import RichTextEditor from '../components/markdown/RichEditor';
import { markdownActions, markdownApi } from '../redux/reducers/editor';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    '& > *': {
      margin: theme.spacing(2, 'auto')
    }
  }
}));

const Editor = ({ selectedNote, error }) => {
  const classes = useStyles();
  const [markdownVal, setMarkdownVal] = useState('');
  const [noteTitle, setNotTitle] = useState('');
  const dispatch = useDispatch();

  const onAddNote = () => {
    const item = {
      data: {
        title: noteTitle,
        markdownVal
      },
      type: markdownActions.POST
    };
    dispatch(markdownApi(item));
  };
  return (
    <div className={classes.root}>
      <Box justifyContent="space-between" display="flex">
        <Typography variant="h4" noWrap>
          Notes
        </Typography>
        <Button onClick={onAddNote} variant="contained" color="primary">
          {selectedNote ? 'Update' : 'Save'}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        id="outlined-basic"
        fullWidth
        color="primary"
        onChange={(e) => setNotTitle(e.target.value)}
        label="Note Title"
        variant="outlined"
      />
      <div>
        <RichTextEditor preview markdownVal={markdownVal} setMarkdownVal={setMarkdownVal} />
      </div>
    </div>
  );
};

export default Editor;
