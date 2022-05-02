import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  app: null,
  avatar: null,
  connecting: false
};

const webVault = createSlice({
  initialState,
  name: 'webVault',
  reducers: {
    setUserProfile(state, action) {
      const user = action.payload;
      if (user.avatar) {
        state.avatar = user.avatar;
      }
      state.app = {
        name: user.name,
        country: user.country
      };
      return state;
    },
    onConnecting(state, action) {
      state.connecting = action.payload;
    },
    onLogout(state) {
      state.avatar = null;
      state.app = null;
      return state;
    }
  }
});

export const { onConnecting, setUserProfile, onLogout } = webVault.actions;

export default webVault.reducer;
