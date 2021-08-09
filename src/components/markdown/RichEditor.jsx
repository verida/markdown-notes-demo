import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    border: '1px solid #d1d1d1',
    borderRadius: '8px',
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)',
    overflow: 'scroll',

  },

}));

const RichTextEditor = ({ state, setState }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Editor
        editorState={state}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={setState}
        placeholder="Enter your notes"
      />
    </div>
  );
};

export default RichTextEditor;
