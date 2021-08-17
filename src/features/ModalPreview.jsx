
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
  bottom: {
    display: 'flex'
  },
  flexGrow: {
    flex: 1
  },
  button: {
    color: theme.palette.primary.main
  }
}));

const ModalPreview = () => {
  const classes = useStyles();
  const {
    noteTitle,
    markdownVal
  } = useContext(AppContext);
  const [viewState, setViewState] = useState(0);


  const onEdit = (value) => {
    setViewState(value)
  };

  const renderView = () => {
    switch (viewState) {
      case 0:
        return <MarkdownPreview source={markdownVal} />
      case 1:
        return <MDEditorForm />
      default:
        return <p>Error!</p>
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.bottom}>
        <div className={classes.flexGrow}>
          <Typography variant="h6" >
            {viewState === 0 && noteTitle}
          </Typography></div>
        <div>
          <IconButton onClick={() => onEdit(0)}>
            <VisibilityIcon className={viewState === 0 ? classes.button : ''} />
          </IconButton>
          <IconButton onClick={() => onEdit(1)}>
            <EditIcon className={viewState === 1 ? classes.button : ''} />
          </IconButton>
        </div>
      </div>
      {renderView()}
    </div>
  )
}

export default ModalPreview
