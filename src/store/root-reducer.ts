import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { modalsSlice } from './modals/modals.slice';
import { notifierSlice } from './notifier/notifier.slice';
import { storageSlice } from './storage/storage.slice';
import { uploaderSlice } from './uploader/uploader.slice';

export const rootReducer = combineReducers({
  notifier: notifierSlice.reducer,
  uploader: uploaderSlice.reducer,
  auth: authSlice.reducer,
  storage: storageSlice.reducer,
  modals: modalsSlice.reducer,
});
