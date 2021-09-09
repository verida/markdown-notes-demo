import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  },
  content: {
    fontWeight: 600,
    color: theme.palette.black,
    boxShadow: '0px 4px 50px rgba(4, 17, 51, 0.25)'
  }
}));

export default function AppSnackBar({ snackPack, setSnackPack, messageInfo }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackPack(false);
  };

  const handleExited = () => {
    // setMessageInfo(undefined);
  };

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackPack}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        className={classes.content}
        message={messageInfo || undefined}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
