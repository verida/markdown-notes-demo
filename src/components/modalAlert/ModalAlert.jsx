import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});




const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    boxShadow: "0px 35px 45px rgba(7, 14, 39, 0.05)",
  },
  contentActions: {
    textAlign: 'center',
  }
}));

export default function ModalAlert({ children, title, open, setOpen }) {
  const classes = useStyles()
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        className={classes.contentActions}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {title || "Notification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.contentActions}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
