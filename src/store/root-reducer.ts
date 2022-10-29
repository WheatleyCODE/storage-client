import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { notifierSlice } from './notifier/notifier.slice';
import { storageSlice } from './storage/storage.slice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  notifier: notifierSlice.reducer,
  storage: storageSlice.reducer,
});
