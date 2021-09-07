/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SortBarPanel from '../components/sortBarPanel/SortBarPanel';
import NotesUI from '../components/editorview/NotesViewUI';
import { NotesHeader } from '../components/common/index';

const Home = () => {
  return (
    <div>
      <NotesHeader />
      <SortBarPanel />
      <NotesUI />
    </div>
  );
};

export default Home;
