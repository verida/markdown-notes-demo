
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#37D5C7'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, children }) {
  const classes = useStyles();


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog style={{
        width: '80%',
        height: '80%',
        margin: ' auto',
        borderRadius: '8px'
      }} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="fixed" className={classes.appBar} >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Preview
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </div>
  );
}

