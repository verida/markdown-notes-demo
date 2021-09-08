import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import markDownServices from '../../../api/services';

const initialState = {
  notes: [],
  editorViewType: 'grid',
  selectedNote: {
    title: '',
    body: ''
  },
  noteItem: {
    title: 'Untitled',
    isFavorite: false
  },
  error: ''
};

export const markdownActions = {
  POST: 'onPostContent',
  PATCH: 'onUpdateContent',
  DELETE: 'onDeleteContent'
};

export const editorType = {
  GRID: 'grid',
  TABLE: 'table'
};

export const markdownApi = createAsyncThunk('editor/markdown', async (data) => {
  switch (data.type) {
    case markdownActions.POST: {
      const response = await markDownServices.postContent(data.data);
      return response;
    }
    case markdownActions.PATCH: {
      const response = await markDownServices.updateContent(data.data);
      return response;
    }
    case markdownActions.DELETE: {
      const response = await markDownServices.deleteContent(data.data);
      return response;
    }
    default:
      break;
  }
});

const markdownEditor = createSlice({
  initialState,
  name: 'markdownEditor',
  reducers: {
    setMarkdownNotes(state, action) {
      state.notes = action.payload;
      return state;
    },
    switchDisplay(state, action) {
      state.editorViewType = action.payload;
      return state;
    },
    setSelectedNote(state, action) {
      const data = action.payload;
      state.selectedNote = {
        title: data.title,
        body: data.body
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
    setFavoriteItem(state, action) {
      const data = action.payload;
      const prevState = {
        ...state,
        noteItem: {
          ...state.noteItem,
          isFavorite: data
        }
      };
      state = prevState;
      return state;
    }
  },
  extraReducers: {
    [markdownApi.fulfilled]: (state, action) => {
      const notes = action.payload;
      state.notes = notes;
      return state;
    },
    [markdownApi.rejected]: (state) => {
      state.error = 'something wrong';
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
  setFavoriteItem
} = markdownEditor.actions;

export default markdownEditor.reducer;
