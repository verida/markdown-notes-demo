import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  editorViewType: 'grid',
  selectedNote: {},
  noteItem: {
    title: 'Untitled',
    isFavorite: false
  }
};

export const editorType = {
  GRID: 'grid',
  TABLE: 'table'
};

const markdownEditor = createSlice({
  initialState,
  name: 'markdownEditor',
  reducers: {
    setMarkdownNotes(state, action) {
      if (action.payload && action.payload.length) {
        state.notes = action.payload;
      }
      return state;
    },
    switchDisplay(state, action) {
      state.editorViewType = action.payload;
      return state;
    },
    setSelectedNote(state, action) {
      const data = action.payload;
      state.selectedNote = {
        ...data
      };
    },
    setNoteTitle(state, action) {
      const data = action.payload;
      const prevState = {
        ...state,
        noteItem: {
          ...state.noteItem,
          title: data
        }
      };
      state = prevState;
      return state;
    },
    setNoteItem(state, action) {
      const data = action.payload;
      const prevState = {
        ...state,
        noteItem: {
          title: data.title,
          isFavorite: data.isFavorite
        }
      };
      state = prevState;
      return state;
    },
    setFavoriteItem(state) {
      const prevState = {
        ...state,
        noteItem: {
          ...state.noteItem,
          isFavorite: !state.noteItem.isFavorite
        }
      };
      state = prevState;
      return state;
    }
  }
});

export const {
  onError,
  setMarkdownNotes,
  onAddNoteItem,
  onDeleteNote,
  onUpdateNote,
  switchDisplay,
  setSelectedNote,
  setNoteTitle,
  setFavoriteItem,
  setNoteItem
} = markdownEditor.actions;

export default markdownEditor.reducer;
