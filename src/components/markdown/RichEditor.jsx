import React from 'react';
import { makeStyles } from '@material-ui/core';
import MarkdownEditor from "@uiw/react-markdown-editor";

const useStyles = makeStyles(() => ({
  root: {
    height: 500,
    // width: 500,
    border: '1px solid #d1d1d1',
    borderRadius: '8px',
    boxShadow: '0px 35px 45px rgba(7, 14, 39, 0.05)',
    overflow: 'scroll',

  },
}));

const RichTextEditor = ({ markdownVal, setMarkdownVal, preview }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <MarkdownEditor
        value={markdownVal}
        height={500}
        visible={preview}
        onChange={(editor, data, value) => {
          setMarkdownVal(value);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
