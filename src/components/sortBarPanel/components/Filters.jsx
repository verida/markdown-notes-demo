import React from 'react';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as AngleIcon } from '../../../assets/icons/angle_down_filled.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow_down.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  paper: {
    // marginRight: theme.spacing(2)
  },
  divider: {
    border: '1px solid #E6E8EB',
    // transform: 'rotate(90deg)',
    height: 30,
    // margin: theme.spacing(0.3, 2)
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.3, 0.2)
    }
  },
  popperButton: {
    background: '#FFFFFF',
    border: '1px solid #E6E8EB',
    width: '7.7rem',
    height: '2.5rem',
    textTransform: 'capitalize'
  },
  angleIcon: {
    margin: '0.5rem  -0.6rem 0 0.6rem'
  },
  arrowDropIcon: {
    margin: theme.spacing(0.2, 0.3, 0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.2, 0.1, 0, 0.3)
    }
  },
  activePopperButton: {
    width: '7.7rem',
    height: '2.5rem',
    textTransform: 'capitalize',
    border: `1px solid ${theme.palette.primary.main}`
  },
  checkbox: {
    margin: theme.spacing(0, 0.1)
  }
}));

export default function FiltersUI() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          endIcon={<SvgIcon className={classes.angleIcon} component={AngleIcon} />}
          className={open ? classes.activePopperButton : classes.popperButton}
        >
          By Name
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper
                elevation={0}
                style={{
                  margin: '0.4rem  0 0 4.5rem',
                  width: '12.75rem',
                  zIndex: 9999
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>By Name</MenuItem>
                    <MenuItem onClick={handleClose}>By last edited</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <SvgIcon className={classes.arrowDropIcon} component={ArrowDownIcon} />
        <div className={classes.divider} />
        <FormControlLabel
          className={classes.checkbox}
          control={<Checkbox name="checkedB" color="primary" />}
          label="Show only favorites"
        />
      </Box>
    </div>
  );
}
