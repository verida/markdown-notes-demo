import React from 'react'
import Grid from '@material-ui/core/Grid';
import NotesCard from '../components/notescard/NotesCard';
import SwipeableSideMenu from '../components/swippeableSideBar/SwippeableSideBar'
import MDEditorForm from '../features/MDEditorForm';
import { StacksEditor } from '@stackoverflow/stacks-editor';


// new StacksEditor(
//   document.querySelector("#editor-container"),
//   "*Your* **markdown** here"
// );

const Home = () => {




  return (
    <div>
      <SwipeableSideMenu children={<MDEditorForm />} />
      {/* <div id="editor-container"></div> */}
      <Grid container spacing={2}>
        {[1, 2, 3, 45, 63, 6, 7, 8, 9].map(list => (
          <Grid item md={4} sm={12} xs={12} key={list}>
            <NotesCard />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home;
