import React from 'react';
import { makeStyles } from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles(() => ({
  root: {
    height: 500,
    border: '1px solid #d1d1d1',
    borderRadius: '8px',
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)',
    overflow: 'scroll'
  }
}));

const RichTextEditor = ({ mdValue, setMDValue, preview }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MDEditor
        preview={preview ? 'preview' : 'live'}
        value={mdValue}
        height={500}
        onChange={setMDValue}
      />
    </div>
  );
};

export default RichTextEditor;
