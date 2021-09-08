import { combineReducers } from '@reduxjs/toolkit';
import connectVault from './auth';
import markdownEditor from './editor';

const rootReducer = combineReducers({
  connectVault,
  markdownEditor
});

export default rootReducer;
