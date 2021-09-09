import React from 'react';
import NotesUI from '../components/editorview/NotesViewUI';
import { NotesHeader } from '../components/common/index';

const Home = (props) => {
  return (
    <div>
      <NotesHeader {...props} />
      <NotesUI />
    </div>
  );
};

export default Home;
