import React from 'react';
import { useSelector } from 'react-redux';
import { editorType } from '../../redux/reducers/editor';
import NoteCardDisplay from '../notescard/NoteCardDisplay';
import NoteTableDisplay from '../noteTable/NoteTable';

const NotesUI = () => {
  const { editorViewType } = useSelector((state) => state.markdownEditor);

  switch (editorViewType) {
    case editorType.GRID:
      return <NoteCardDisplay />;
    case editorType.TABLE:
      return <NoteTableDisplay />;
    default:
      return <NoteCardDisplay />;
  }
};

export default NotesUI;
