import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';
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
            <Grid item md={4} sm={12} xs={12} key={list._id}>
              <NotesCard item={list} />
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
