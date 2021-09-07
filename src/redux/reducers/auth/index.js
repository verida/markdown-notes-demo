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
      const data = action.payload;
      const { avatar, name, country } = data?.userProfile;
      state.app = {
        name,
        country
      };
      const parseAvatarValue = JSON.parse(avatar);
      state.avatar = `data:image/${parseAvatarValue.format};base64,${parseAvatarValue.base64}`;
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
    onError(state, action) {
      const error = action.payload;
      state.error = error;
      return state;
    }
  }
});

export const { onError, onSuccessLogin, onConnecting, setUserAvatar, setUserProfile } =
  webVault.actions;

export default webVault.reducer;
