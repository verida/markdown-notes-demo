import React from 'react';
import NotesUI from '../components/editorview/NotesViewUI';
import { NotesHeader } from '../components/common/index';

const Home = () => {
  return (
    <div>
      <NotesHeader />
      <NotesUI />
    </div>
  );
};

export default Home;
