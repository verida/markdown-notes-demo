import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import ShareIcon from '../../assets/icons/Share.svg';

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
  avatar: {
    border: `2px solid ${theme.palette.primary.main}`
  }
}));

export default function UserAvatar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar className={open ? classes.avatar : ''} alt="appData.name" src="avatar" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        style={{
          margin: '3rem 1rem 0 -1.7rem'
        }}
        onClose={handleClose}
        elevation={2}
        PaperProps={{
          style: {
            width: '20ch',
            borderRadius: '6px',
            filter: 'drop-shadow(0px 8px 20px rgba(17, 45, 87, 0.1))'
          }
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={ShareIcon} alt="user" />
          </ListItemIcon>
          <Typography className={classes.iconText} variant="inherit">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
