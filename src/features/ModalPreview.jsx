import React from 'react';
import { makeStyles } from '@material-ui/core';
import MDEditorForm from './MDEditorForm';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ModalPreview = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MDEditorForm preview />
    </div>
  );
};

export default ModalPreview;
