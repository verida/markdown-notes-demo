import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import RichTextEditor from '../components/markdown/RichEditor';
import useEditor from '../components/markdown/useEditor';


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
  const {
    editEditorText,
    // getMarkDown,
    setEditorText,
    // setMDContent
  } = useEditor();

  return (
    <div className={classes.root} >
      <Typography variant="h4" noWrap>
        Notes
      </Typography>
      <TextField id="outlined-basic" fullWidth label="Note Title" variant="outlined" />
      <div>
        <RichTextEditor state={editEditorText} setState={setEditorText} />
      </div>
      <Button
        // size="large"
        // onClick={initializeApp}
        // className={classes.button}
        variant="contained"
        fullWidth
        color="secondary"
      >
        Save
      </Button>
    </div>
  );
}

export default MDEditorForm
