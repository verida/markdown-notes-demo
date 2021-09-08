import React, { useState } from 'react';
import NoteCardDisplay from '../notescard/NoteCardDisplay';
import NoteTableDisplay from '../noteTable/NoteTable';

const NotesUI = () => {
  const [viewType] = useState('grid');

  switch (viewType) {
    case 'grid':
      return <NoteCardDisplay />;
    case 'table':
      return <NoteTableDisplay />;
    default:
      return <NoteCardDisplay />;
  }
};

export default NotesUI;
