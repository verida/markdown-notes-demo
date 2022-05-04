import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import NotesUI from '../components/editorview/NotesViewUI';
import { NotesHeader } from '../components/common/index';
import markDownServices from '../api/services';
import { setMarkdownNotes } from '../redux/reducers/editor';

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const notes = await markDownServices.getNotes();
        dispatch(setMarkdownNotes(notes));
      } catch (error) {
        toast.error(markDownServices.error?.message);
      } finally {
        setLoading(false);
      }
    })();

    markDownServices.on('notesChanged', (data) => {
      if (data && Array.isArray(data)) {
        dispatch(setMarkdownNotes(data));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Box
        mt={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        paddingY={2}
        fontSize={20}
        fontWeight={600}
      >
        fetching all notes...
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <NotesHeader {...props} />
      <NotesUI />
    </Box>
  );
};

export default Home;
