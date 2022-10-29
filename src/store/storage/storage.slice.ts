import { createSlice } from '@reduxjs/toolkit';
import { IStorageState } from 'types';
import { fetchStorage } from './storage.actions';

const initialState: IStorageState = {
  id: '',
  name: '',
  user: '',
  diskSpace: 0,
  usedSpace: 0,
  folders: [],
  tracks: [],
  files: [],
  albums: [],
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStorage.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.user = payload.user;
      state.diskSpace = payload.diskSpace;
      state.usedSpace = payload.usedSpace;
      state.folders = payload.folders;
      state.tracks = payload.tracks;
      state.files = payload.files;
      state.albums = payload.albums;
    });
  },
});

export const storageActions = storageSlice.actions;
