import {
  Box,
  Button,
  makeStyles,
  Typography,
  SvgIcon,
  Divider,
  IconButton
} from '@material-ui/core';
import React, { useState } from 'react';
import TableIcon from '../../assets/icons/Table.svg';
import ImportIcon from '../../assets/icons/Import.svg';
import { ReactComponent as PLusIcon } from '../../assets/icons/Plus.svg';
import GridIcon from '../../assets/icons/grid_icon.svg';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '34px',
    lineHeight: '100%',
    color: '#041133'
  },
  button: {
    width: '10rem',
    height: '2.5rem',
    margin: theme.spacing(0, 1),
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
    // padding: theme.spacing(0.2, 0.1)
  },
  tableIcon: {
    margin: theme.spacing(-0.7, 1)
  },
  divider: {
    margin: '1rem  0 0 0'
  },
  header: {
    margin: theme.spacing(0)
  }
}));

const NotesHeader = () => {
  const classes = useStyles();
  const [viewType, setViewType] = useState('table');
  const handleSwitchDisplay = (type) => {
    setViewType(type);
  };
  return (
    <div>
      <Box
        className={classes.header}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography className={classes.title} variant="h3">
          Markdown Editor
        </Typography>
        <Box display="flex">
          {viewType === 'table' ? (
            <IconButton className={classes.tableIcon} onClick={() => handleSwitchDisplay('grid')}>
              <img src={GridIcon} alt="title" />
            </IconButton>
          ) : (
            <IconButton className={classes.tableIcon} onClick={() => handleSwitchDisplay('table')}>
              <img src={TableIcon} alt="title" />
            </IconButton>
          )}
          <Button
            className={classes.button}
            variant="outlined"
            startIcon={<img src={ImportIcon} alt="import" />}
          >
            Import note
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<SvgIcon component={PLusIcon} />}
          >
            New note
          </Button>
        </Box>
      </Box>
      <Divider className={classes.divider} />
    </div>
  );
};

export default NotesHeader;
