import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStorageState, WorkplaceItem } from 'types';
import { createFolder, fetchStorage } from './storage.actions';

const initialState: IStorageState = {
  id: '',
  currentItems: [],
  workplaceItems: [],
  allItems: [],
  lastItems: [],
  name: '',
  user: '',
  diskSpace: 0,
  usedSpace: 0,
  folders: [],
  tracks: [],
  files: [],
  albums: [],
  loading: true,
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,

  reducers: {
    setCurrent: (state, { payload }: PayloadAction<WorkplaceItem[]>) => {
      if (JSON.stringify(state.currentItems) !== JSON.stringify(payload)) {
        state.currentItems = payload;
      }
    },

    addCurrent: (state, { payload }: PayloadAction<WorkplaceItem>) => {
      if (!state.currentItems.find((item) => item.id === payload.id)) {
        state.currentItems = [...state.currentItems, payload];
      }
    },

    setWorkplace: (state, { payload }: PayloadAction<WorkplaceItem[]>) => {
      state.workplaceItems = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        state.folders = [payload, ...state.folders];

        state.allItems = [...state.folders, ...state.tracks, ...state.files, ...state.albums];

        state.lastItems = [...state.folders, ...state.tracks, ...state.files, ...state.albums]
          .filter((item) => !item.isTrash)
          .sort((a, b) => a.openDate - b.openDate)
          .splice(0);
      })
      .addCase(fetchStorage.pending, (state) => {
        state.loading = true;
        state.id = '';
        state.name = '';
        state.user = '';
        state.diskSpace = 0;
        state.usedSpace = 0;
        state.folders = [];
        state.tracks = [];
        state.files = [];
        state.albums = [];
        state.allItems = [];
        state.lastItems = [];
      })
      .addCase(fetchStorage.fulfilled, (state, { payload }) => {
        const { id, name, user, diskSpace, usedSpace, folders, tracks, files, albums } = payload;

        state.loading = false;
        state.id = id;
        state.name = name;
        state.user = user;
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.folders = folders;
        state.tracks = tracks;
        state.files = files;
        state.albums = albums;
        state.allItems = [...folders, ...tracks, ...files, ...albums];

        state.lastItems = [...folders, ...tracks, ...files, ...albums]
          .filter((item) => !item.isTrash)
          .sort((a, b) => a.openDate - b.openDate)
          .splice(0);
      })
      .addCase(fetchStorage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const storageActions = storageSlice.actions;
