import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';
import { MOBILE_MEDIA_WIDTH } from '../../constants';

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
  const matches = useMediaQuery(MOBILE_MEDIA_WIDTH);

  const handleEditorPreview = () => {
    if (matches) {
      return preview ? 'preview' : 'edit';
    }
    return preview ? 'preview' : 'live';
  };

  return (
    <div className={classes.root}>
      <MDEditor
        preview={handleEditorPreview()}
        value={mdValue}
        height={500}
        onChange={setMDValue}
      />
    </div>
  );
};

export default RichTextEditor;
