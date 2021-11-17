import { createSlice } from '@reduxjs/toolkit';
import markDownServices from '../../../api/services';

const initialState = {
  app: null,
  avatar: null,
  connecting: false
};

const webVault = createSlice({
  initialState,
  name: 'webVault',
  reducers: {
    setUserProfile(state) {
      const user = markDownServices.profile;
      if (user.avatar) {
        state.avatar = user.avatar;
      }
      state.app = {
        name: user.name,
        country: user.country
      };
      state.connected = true;
      return state;
    },
    onConnecting(state, action) {
      state.connecting = action.payload;
    },
    onLogout(state) {
      state.connected = false;
      state.avatar = null;
      state.app = null;
      return state;
    }
  }
});

export const { onConnecting, setUserProfile, onLogout } = webVault.actions;

export default webVault.reducer;
