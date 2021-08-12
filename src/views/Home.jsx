import React, { useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import NotesCard from '../components/notescard/NotesCard';
import SwipeableSideMenu from '../components/swippeableSideBar/SwippeableSideBar'
import MDEditorForm from '../features/MDEditorForm';
import { AppContext } from '../contextApi/ContextProvider';



const Home = () => {
  const { notes } = useContext(AppContext);

  return (
    <div>
      <SwipeableSideMenu children={<MDEditorForm />} />
      {notes.length
        ?
        <Grid container spacing={2}>
          {notes.map(list => (
            <Grid item md={4} sm={12} xs={12} key={list}>
              <NotesCard item={list} key={list.title} />
            </Grid>
          ))}
        </Grid>
        :
        <p>No Note</p>
      }
    </div>
  )
}

export default Home;
