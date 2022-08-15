import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RichTextEditor from '../components/markdown/RichEditor';
import TrashIcon from '../assets/icons/Trash.svg';
import ArrowLeft from '../assets/icons/arrow_left.svg';
import SaveNote from '../assets/icons/update_note.svg';
import PreviewIcon from '../assets/icons/eye.svg';
import EditIcon from '../assets/icons/Edit.svg';
import { browserQueries, noteActionsType } from '../utils/common.utils';
import AppSnackBar from '../components/snackbar/SnackBar';
import markDownServices from '../api/services';
import AppModalUi from '../components/modal/AppModal';
import { DeleteNote } from '../components/common/editorActions';
import { MOBILE_MEDIA_WIDTH } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    '& > *': {
      margin: theme.spacing(2, 'auto')
    }
  },
  arrowBackIcon: {
    borderRadius: '50%',
    background: '#687085',
    padding: '0.5rem'
  },
  actionButton: {
    padding: '0.5rem 1.5rem',
    margin: '0 1rem',
    color: theme.palette.black,
    fontWeight: 'bold'
  },
  saveButton: {
    fontWeight: 'bold',
    padding: '0.5rem 1.5rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  saveButtonMobile: {
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: {
      visibility: 'visible'
    }
  },
  editPreviewButton: {
    background: '#F7F8F9',
    border: `1px solid ${theme.palette.primary.main}`,
    textTransform: 'capitalize'
  },
  activeEditPreview: {
    background: '#EDECFB',
    border: `1px solid ${theme.palette.primary.main}`,
    textTransform: 'capitalize'
  },
  buttonGroup: {
    margin: theme.spacing(0, 0, 0, 5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 1)
    }
  }
}));

const Editor = ({ history, location }) => {
  const classes = useStyles();
  const matches = useMediaQuery(MOBILE_MEDIA_WIDTH);
  const [snackPack, setSnackPack] = useState(false);
  const [mdValue, setMDvalue] = useState('');
  const [modalView, setModalView] = useState({
    editor: true,
    preview: false
  });
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({
    title: 'delete',
    type: '',
    item: {}
  });
  const pageType = browserQueries(location).get('type');

  const { noteItem, selectedNote } = useSelector((state) => state.markdownEditor);

  const handleView = (type) => {
    const isEdit = type === 'editor';
    setModalView({
      editor: isEdit && true,
      preview: !isEdit && true
    });
  };

  const notifications = () => {
    setSnackPack(!snackPack);
    history.push('/');
  };

  const updateNotes = () => {
    const data = {
      title: noteItem.title,
      isFavorite: noteItem.isFavorite,
      body: mdValue
    };

    if (pageType === 'edit') {
      data._id = selectedNote._id;
    }

    if (!noteItem.title) {
      toast.error('Please enter note title');
      return;
    }

    if (!mdValue) {
      toast.error('Please enter notes in the editor');
      return;
    }

    markDownServices.saveNote(data);
    notifications();
  };

  const onDeleteNote = () => {
    setAction({
      title: 'Are you sure you want to delete?',
      type: noteActionsType.DELETE,
      item: selectedNote
    });
    setOpen(true);
  };

  useEffect(() => {
    if (pageType === 'edit') {
      setMDvalue(selectedNote.body);
    }
  }, [pageType, selectedNote.body]);
  return (
    <div className={classes.root}>
      {setSnackPack && (
        <AppSnackBar messageInfo="Note Updated" setSnackPack={setSnackPack} snackPack={snackPack} />
      )}
      <AppModalUi open={open} setOpen={setOpen} title={action.title}>
        <DeleteNote redirect item={action.item} setOpen={setOpen} />
      </AppModalUi>
      <Box justifyContent="space-between" display="flex" alignItems="center">
        <IconButton onClick={() => history.goBack()}>
          <img src={ArrowLeft} className={classes.arrowBackIcon} alt="go-back" />
        </IconButton>
        <ButtonGroup
          className={classes.buttonGroup}
          size="medium"
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button
            onClick={() => handleView('editor')}
            className={modalView.editor ? classes.activeEditPreview : classes.editPreviewButton}
            startIcon={<img src={EditIcon} alt="edit" />}
          >
            {!matches && 'Editor'}
          </Button>
          <Button
            className={modalView.preview ? classes.activeEditPreview : classes.editPreviewButton}
            onClick={() => handleView('preview')}
            startIcon={<img src={PreviewIcon} alt="preview" />}
          >
            {!matches && 'Preview'}
          </Button>
        </ButtonGroup>
        <div>
          {pageType === 'edit' && (
            <IconButton onClick={onDeleteNote}>
              <img alt="icon" src={TrashIcon} />
            </IconButton>
          )}
          {/* <Button className={classes.actionButton} variant="outlined" color="primary">
            Share
          </Button> */}
          <IconButton className={classes.saveButtonMobile} onClick={updateNotes}>
            <img alt="icon" src={SaveNote} />
          </IconButton>
          <Button
            onClick={updateNotes}
            className={classes.saveButton}
            variant="contained"
            color="primary"
          >
            {selectedNote.title ? 'Update' : 'Save'}
          </Button>
        </div>
      </Box>
      <div>
        <RichTextEditor preview={modalView.preview} mdValue={mdValue} setMDValue={setMDvalue} />
      </div>
    </div>
  );
};

export default Editor;
