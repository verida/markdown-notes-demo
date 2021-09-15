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
    connectWithVault() {},
    onSuccessLogin(state, action) {
      const user = action.payload;
      if (user.avatar) {
        const parseAvatarValue = JSON.parse(user?.avatar);
        state.avatar = `data:image/${parseAvatarValue.format};base64,${parseAvatarValue.base64}`;
      }
      state.app = {
        name: user?.name,
        country: user?.country
      };
      state.connecting = !state.connecting;
      return state;
    },
    onConnecting(state) {
      state.connecting = !state.connecting;
    },
    setUserAvatar(state, action) {
      const parseAvatarValue = JSON.parse(action.payload);
      state.avatar = `data:image/${parseAvatarValue.format};base64,${parseAvatarValue.base64}`;
      state.connecting = !state.connecting;
      return state;
    },
    setUserProfile(state, action) {
      state.app = action.payload;
      return state;
    },
    onLogout(state) {
      state.avatar = null;
      state.app = null;
      return state;
    }
  }
});

export const { onSuccessLogin, onConnecting, setUserAvatar, setUserProfile, onLogout } =
  webVault.actions;

export default webVault.reducer;
