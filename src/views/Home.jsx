import React from 'react';
import { Box } from '@material-ui/core';
import NotesUI from '../components/editorview/NotesViewUI';
import { NotesHeader } from '../components/common/index';

const Home = (props) => {
  return (
    <Box>
      <NotesHeader {...props} />
      <NotesUI />
    </Box>
  );
};

export default Home;
