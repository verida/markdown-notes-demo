import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350,
    }
  },
  fullList: {
    width: 'auto',
  },
  button: {
    background: theme.palette.black
  }

}));

const SwipeableSideMenu = ({ children, position = "right" }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      {children}
    </div>
  );


  return (
    <div>
      <React.Fragment>
        <Button
          size="large"
          className={classes.button}
          endIcon={<AddIcon />}
          variant="contained"
          color="secondary"
          onClick={toggleDrawer(position, true)}>Add Note</Button>
        <SwipeableDrawer
          anchor={position}
          open={state[position]}
          onClose={toggleDrawer(position, false)}
          onOpen={toggleDrawer(position, true)}
        >
          {list(position)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}


export default SwipeableSideMenu;