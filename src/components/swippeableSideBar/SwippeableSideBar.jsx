import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { AppContext } from '../../contextApi/ContextProvider';


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
    margin: theme.spacing(1, 0)
  }

}));

const position = "right";

const SwipeableSideMenu = ({ children }) => {
  const classes = useStyles();

  const { toggleDrawer, slideOpen } = useContext(AppContext);

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
          variant="outlined"
          color="secondary"
          onClick={toggleDrawer(position, true)}>Add Note</Button>
        <SwipeableDrawer
          anchor={position}
          open={slideOpen[position]}
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