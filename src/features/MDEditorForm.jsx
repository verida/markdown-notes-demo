import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import RichTextEditor from '../components/markdown/RichEditor';
import { AppContext } from '../contextApi/ContextProvider';
import useActions from '../hooks/useActions';
import BackDropLoader from '../components/appLoaders/BackDropLoader';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    '& > *': {
      margin: theme.spacing(2, 'auto'),
      // width: '95%'
    },
  },
}));

const MDEditorForm = () => {
  const classes = useStyles();
  const { postContent } = useActions();
  const {
    markdownVal,
    setMarkdownVal,
    isLoading,
    noteTitle,
    setNoteTitle
  } = useContext(AppContext);

  return (
    <div className={classes.root}>
      {isLoading && <BackDropLoader load />}
      <Box justifyContent="space-between" display="flex">
        <Typography variant="h4" noWrap>
          Notes
        </Typography>
        <Button
          onClick={() => {
            postContent({ title: noteTitle, markdownVal })
          }}
          variant="contained"
          color="secondary"
        >
          Save
        </Button>
      </Box>
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
