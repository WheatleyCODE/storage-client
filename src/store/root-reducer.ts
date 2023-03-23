import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { modalsSlice } from './modals/modals.slice';
import { restoreSlice } from './restore/restore.slice';
import { playerSlice } from './player/player.slice';
import { storageSlice } from './storage/storage.slice';
import { uploaderSlice } from './uploader/uploader.slice';

export const rootReducer = combineReducers({
  restore: restoreSlice.reducer,
  uploader: uploaderSlice.reducer,
  auth: authSlice.reducer,
  storage: storageSlice.reducer,
  modals: modalsSlice.reducer,
  player: playerSlice.reducer,
});
