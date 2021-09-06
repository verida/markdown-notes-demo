import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: ''
};

const connectVault = createSlice({
  initialState,
  name: 'connectVault',
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

export const { onError, onSuccess } = connectVault.actions;

export default connectVault.reducer;
