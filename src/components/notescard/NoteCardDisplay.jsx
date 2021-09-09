import React from 'react';
import Markdown from 'markdown-to-jsx';
import Moment from 'react-moment';
import { Grid, IconButton, makeStyles, SvgIcon } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { reduceStringLength } from '../../helpers/Editor.helpers';
import { ReactComponent as StarIcon } from '../../assets/icons/star_filled.svg';
import UnFilledStarIcon from '../../assets/icons/Star_unfilled.svg';
import NotesAction from '../common/NotesActions';
import { setNoteTitle, setSelectedNote } from '../../redux/reducers/editor';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '16.9rem',
    height: '14.5rem',
    background: '#F7F8F9',
    border: '1px solid #E6E8EB',
    borderRadius: '6px',
    margin: theme.spacing(3, 0),
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: '#EDECFB',
      boxShadow: '0px 4px 15px rgba(66, 59, 206, 0.1)'
    }
  },
  rootMobile: {
    width: '10.5rem',
    height: '10.5rem',
    background: '#F7F8F9',
    border: '1px solid #E6E8EB',
    boxSizing: 'border-box',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: theme.spacing(3, 0)
  },
  contentBox: {
    background: '#fff',
    maxHeight: 'calc(14.5rem - 4.188rem)',
    minHeight: 'calc(14.5rem - 4.188rem)',
    margin: '16px 16px 0 16px',
    padding: '1rem 1.5rem 0 1.5rem',
    '& > *': {
      fontSize: '0.8rem !important'
    }
  },
  contentBoxMobile: {
    fontSize: '0.6rem '
  },
  panelTab: {
    width: '100%',
    height: '4.188rem',
    background: '#FFFFFF',
    boxShadow: '0px -1px 8px rgba(4, 17, 51, 0.05)'
  },
  panelTabMobile: {
    margin: '0 0 -2rem 0x'
  },
  cartTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '150%',
    color: '#041133',
    flex: 'none',
    order: 1,
    flexGrow: 0,
    margin: '0rem 0.2rem'
  },
  caption: {
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: '#687085',
    margin: '0 0 0.5rem 0'
  },
  captionContainer: {
    marginTop: '-0.25rem'
  },
  avatar: {
    position: 'absolute',
    top: '8.5rem',
    right: 0,
    margin: theme.spacing(0, 2)
  },
  tableContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobileUI: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  timeIcon: {
    margin: theme.spacing(0, 0.4)
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

const NoteCardDisplay = () => {
  const classes = useStyles();
  const { notes } = useSelector((state) => state.markdownEditor);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEdit = (item) => {
    dispatch(setSelectedNote(item));
    dispatch(setNoteTitle(item.title));
    history.push(`/editor?type=edit&id=${item._id}`);
  };

  return (
    <>
      <Grid container spacing={1} className={classes.tableContainer}>
        {notes.map((list) => (
          <Grid item md={3} sm={12} xs={12} key={list._id}>
            <Box m={2} className={classes.root}>
              <Box className={classes.contentBox} onClick={() => onEdit(list)}>
                <Markdown>{list.body}</Markdown>
              </Box>
              <Box className={classes.panelTab}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" ml={1} alignItems="center">
                    {list.isFavorite ? (
                      <IconButton size="small">
                        <SvgIcon component={StarIcon} />
                      </IconButton>
                    ) : (
                      <IconButton size="small">
                        <img src={UnFilledStarIcon} alt="star" />
                      </IconButton>
                    )}
                    <Typography className={classes.cartTitle}>
                      {/* {reduceStringLength(list.title, 13)} */}
                      {list.title}
                    </Typography>
                  </Box>
                  <Box mr={-1}>
                    <NotesAction item={list} />
                    <Box className={classes.avatar} display="flex" />
                  </Box>
                </Box>
                <Box ml={2} className={classes.captionContainer}>
                  <Typography className={classes.caption} variant="caption">
                    Edited
                    <Moment className={classes.timeIcon} fromNow>
                      {list.modifiedAt}
                    </Moment>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Mobile Version UI */}
      <Grid container className={classes.mobileUI}>
        {notes.map((list) => (
          <Grid item md={6} sm={12} xs={6} key={list._id}>
            <Box m={2} className={classes.rootMobile}>
              <Box className={classes.contentBoxMobile} onClick={() => onEdit(list)}>
                {reduceStringLength(list.body, 300)}
              </Box>
              <Box className={classes.panelTabMobile}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <NotesAction item={list} />
                  <Typography className={classes.cartTitle}>Notes title</Typography>
                </Box>
                <Box display="flex" ml={2} className={classes.captionContainer}>
                  <Typography className={classes.caption} variant="caption">
                    Edited
                    <Moment className={classes.timeIcon} fromNow>
                      {list.modifiedAt}
                    </Moment>
                  </Typography>
                  <Box>
                    {list.isFavorite ? (
                      <IconButton size="small">
                        <SvgIcon component={StarIcon} />
                      </IconButton>
                    ) : (
                      <IconButton size="small">
                        <img src={UnFilledStarIcon} alt="star" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NoteCardDisplay;
