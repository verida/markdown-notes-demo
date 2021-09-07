import { combineReducers } from '@reduxjs/toolkit';
import webVault from './auth';
import markdownEditor from './editor';

const rootReducer = combineReducers({
  webVault,
  markdownEditor
});

export default rootReducer;
