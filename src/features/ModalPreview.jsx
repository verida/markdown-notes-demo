
import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MarkdownPreview from '@uiw/react-markdown-preview';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AppContext } from '../contextApi/ContextProvider';
import MDEditorForm from './MDEditorForm';


const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const ModalPreview = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <MDEditorForm preview />
    </div>
  )
}

export default ModalPreview
