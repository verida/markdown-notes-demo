import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AppContext } from '../../contextApi/ContextProvider';
import appServices from '../../api/services';

export default function PopOverMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setAppData, displayAvatar, setNotes, appData, setNoteTitle, setMarkdownVal } =
    useContext(AppContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    appServices.logout().then(() => {
      setNotes([]);
      setAppData({});
      displayAvatar('');
      setNoteTitle('');
      setMarkdownVal('');
    });
  };

  return (
    <div
      style={{
        margin: '0 0 0 0.3rem'
      }}
    >
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem>{appData.name}</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
