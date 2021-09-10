import React from 'react';
import Prototype from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: '0.7rem 2rem'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.3),
    top: theme.spacing(0.2),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '150%'
  },
  dialogRoot: {
    boxShadow: '0px 1px 0px #E6E8EB'
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function AppModalUi({ children, open, setOpen, title }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        className={classes.dialogRoot}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <span className={classes.title}>{title}</span>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

AppModalUi.prototype = {
  children: Prototype.node.isRequired
};
