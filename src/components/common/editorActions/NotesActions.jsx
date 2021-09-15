import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { ListItemIcon, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
// import ShareIcon from '../../../assets/icons/Share.svg';
import TrashIcon from '../../../assets/icons/Trash.svg';
import EditIcon from '../../../assets/icons/Edit.svg';
import { noteActionsType } from '../../../utils/common.utils';

const useStyles = makeStyles((theme) => ({
  iconText: {
    fontFamily: 'Nunito Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '150%',
    color: '#041133',
    margin: theme.spacing(0, 2, 0, -3.7)
  },
  moreIcon: {}
}));

export default function NotesAction({ item, setAction, setOpen }) {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    setAction({
      title: 'Are you sure you want to delete?',
      type: noteActionsType.DELETE,
      item
    });
    setOpen(true);
  };

  const onEditName = () => {
    setAction({
      title: 'Rename',
      type: noteActionsType.RENAME,
      item
    });
    setOpen(true);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {matches ? (
          <MoreHorizIcon className={classes.moreIcon} />
        ) : (
          <MoreVertIcon className={classes.moreIcon} />
        )}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        elevation={0}
        PaperProps={{
          style: {
            width: '20ch',
            borderRadius: '6px'
          }
        }}
      >
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img alt="icon" src={ShareIcon} />
          </ListItemIcon>
          <Typography className={classes.iconText} variant="inherit">
            Share
          </Typography>
        </MenuItem> */}
        <MenuItem onClick={onEditName}>
          <ListItemIcon>
            <img alt="icon" src={EditIcon} />
          </ListItemIcon>
          <Typography className={classes.iconText} variant="inherit">
            Rename
          </Typography>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <img alt="icon" src={TrashIcon} />
          </ListItemIcon>
          <Typography className={classes.iconText} variant="inherit">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
