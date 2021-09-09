import {
  Box,
  Button,
  makeStyles,
  Typography,
  SvgIcon,
  Divider,
  IconButton
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import TableIcon from '../../assets/icons/Table.svg';
// import ImportIcon from '../../assets/icons/Import.svg';
import { ReactComponent as PLusIcon } from '../../assets/icons/Plus.svg';
import GridIcon from '../../assets/icons/grid_icon.svg';
import {
  editorType,
  setNoteItem,
  setSelectedNote,
  switchDisplay
} from '../../redux/reducers/editor';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '34px',
    lineHeight: '100%',
    color: '#041133'
  },
  button: {
    width: '10rem',
    height: '2.5rem',
    margin: theme.spacing(0, 1),
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tableIcon: {
    margin: theme.spacing(-0.7, 1)
  },
  divider: {
    margin: '1rem  0 0 0'
  },
  header: {
    margin: theme.spacing(0)
  },
  link: {
    textDecoration: 'none'
  }
}));

const NotesHeader = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { editorViewType } = useSelector((state) => state.markdownEditor);
  const handleSwitchDisplay = (type) => {
    dispatch(switchDisplay(type));
  };

  const addNewNote = () => {
    dispatch(
      setNoteItem({
        title: 'Untitled',
        isFavorite: false
      })
    );
    dispatch(setSelectedNote({}));
    history.push('/editor');
  };
  return (
    <div>
      <Box
        className={classes.header}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography className={classes.title} variant="h3">
          Markdown Editor
        </Typography>
        <Box display="flex">
          {editorViewType === editorType.TABLE && (
            <IconButton
              className={classes.tableIcon}
              onClick={() => handleSwitchDisplay(editorType.GRID)}
            >
              <img src={GridIcon} alt="title" />
            </IconButton>
          )}
          {editorViewType === editorType.GRID && (
            <IconButton
              className={classes.tableIcon}
              onClick={() => handleSwitchDisplay(editorType.TABLE)}
            >
              <img src={TableIcon} alt="title" />
            </IconButton>
          )}
          {/* <Button
            className={classes.button}
            variant="outlined"
            startIcon={<img src={ImportIcon} alt="import" />}
          >
            Import note
          </Button> */}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={addNewNote}
            startIcon={<SvgIcon component={PLusIcon} />}
          >
            New note
          </Button>
        </Box>
      </Box>
      <Divider className={classes.divider} />
    </div>
  );
};

export default NotesHeader;
