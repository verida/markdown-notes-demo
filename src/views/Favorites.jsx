import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NotesCard from '../components/notescard/NotesCard';
import { AppContext } from '../contextApi/ContextProvider';


const Favorites = () => {
  const { notes } = useContext(AppContext);

  const getAllFavorites = (items) => {
    const data = items.filter(item => item.isFavorite);
    return data
  }

  return (
    <div>
      <Typography variant="h5" noWrap>
        My favorite notes
      </Typography>
      {notes.length
        ?
        <Grid container spacing={2}>
          {getAllFavorites(notes).map(list => (
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

export default Favorites;
