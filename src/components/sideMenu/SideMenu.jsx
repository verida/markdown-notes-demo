import React from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotesIcon from '@material-ui/icons/Notes';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core';

const NavItems = [
  {
    title: 'All Notes',
    path: "##",
    icon: <NotesIcon />
  },
  {
    title: 'Favorites',
    path: '##',
    icon: <StarIcon />
  },
]


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.white
  },
  icon: {
    color: theme.palette.white
  }
}));

const SideMenu = () => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.root}>
        {NavItems.map((item) => (
          <ListItem button key={item.title}>
            <ListItemIcon color="inherit" className={classes.icon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  )
}

export default SideMenu
