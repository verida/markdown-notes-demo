import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, IconButton, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import RichTextEditor from '../components/markdown/RichEditor';
import TrashIcon from '../assets/icons/Trash.svg';
import ArrowLeft from '../assets/icons/arrow_left.svg';
import PreviewIcon from '../assets/icons/eye.svg';
import EditIcon from '../assets/icons/Edit.svg';
import { markdownActions, markdownApi } from '../redux/reducers/editor';
import { browserQueries } from '../utils/common.utils';
import AppSnackBar from '../components/snackbar/SnackBar';

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
  trashIcon: {},
  actionButton: {
    padding: '0.5rem 1.5rem',
    margin: '0 1rem',
    color: theme.palette.black,
    fontWeight: 'bold'
  },
  saveButton: {
    fontWeight: 'bold',
    padding: '0.5rem 1.5rem'
  },
  editPreviewButton: {
    background: '#F7F8F9',
    border: '1px solid #F7F8F9',
    textTransform: 'capitalize',
    borderRadius: '6px 0px 0px 6px'
  },
  activeEditPreview: {
    background: '#EDECFB',
    border: '1px solid #423BCE',
    borderRadius: '0px 6px 6px 0px',
    textTransform: 'capitalize'
  },
  buttonGroup: {
    margin: theme.spacing(0, 0, 0, 5)
  }
}));

const Editor = ({ history, location }) => {
  const classes = useStyles();
  const [snackPack, setSnackPack] = useState(false);
  const [markdownVal, setMarkdownVal] = useState('');
  const [modalView, setModalView] = useState({
    editor: true,
    preview: false
  });
  const dispatch = useDispatch();
  const pageType = browserQueries(location).get('type');
  const { noteItem, selectedNote } = useSelector((state) => state.markdownEditor);

  const handleView = (type) => {
    if (type === 'editor') {
      setModalView({
        editor: true,
        preview: false
      });
    } else {
      setModalView({
        editor: false,
        preview: true
      });
    }
  };
  const onAddNote = () => {
    const item = {
      data: {
        ...noteItem,
        body: markdownVal
      },
      type: pageType && pageType === 'edit' ? markdownActions.PATCH : markdownActions.POST
    };
    dispatch(markdownApi(item));
    setSnackPack(!snackPack);
  };

  useEffect(() => {
    if (pageType && pageType === 'edit') {
      setMarkdownVal(selectedNote.body);
    }
  }, [pageType, selectedNote.body]);
  return (
    <div className={classes.root}>
      {setSnackPack && (
        <AppSnackBar messageInfo="Note Updated" setSnackPack={setSnackPack} snackPack={snackPack} />
      )}

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
            Editor
          </Button>
          <Button
            className={modalView.preview ? classes.activeEditPreview : classes.editPreviewButton}
            onClick={() => handleView('preview')}
            startIcon={<img src={PreviewIcon} alt="preview" />}
          >
            Preview
          </Button>
        </ButtonGroup>
        <div>
          <IconButton>
            <img className={classes.trashIcon} alt="icon" src={TrashIcon} />
          </IconButton>
          <Button className={classes.actionButton} variant="outlined" color="primary">
            Share
          </Button>
          <Button
            onClick={onAddNote}
            className={classes.saveButton}
            variant="contained"
            color="primary"
          >
            {selectedNote.title ? 'Update' : 'Save'}
          </Button>
        </div>
      </Box>
      <div>
        <RichTextEditor
          preview={modalView.preview}
          markdownVal={markdownVal}
          setMarkdownVal={setMarkdownVal}
        />
      </div>
    </div>
  );
};

export default Editor;
