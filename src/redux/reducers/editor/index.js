import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: null,
  error: ''
};

const markdownEditor = createSlice({
  initialState,
  name: 'markdownEditor',
  reducers: {
    onSuccess(state, action) {
      const { userData } = action.payload;
      const currentUser = userData;
      state.user = currentUser;
      return state;
    },
    onError(state, action) {
      const error = action.payload;
      state.error = error;
      return state;
    }
  }
});

export const { onError, onSuccess } = markdownEditor.actions;

export default markdownEditor.reducer;
