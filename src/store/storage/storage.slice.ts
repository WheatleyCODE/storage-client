import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStorageState, WorkplaceItem } from 'types';
import { changeIsTrash, createFolder, deleteItems, fetchStorage } from './storage.actions';

const initialState: IStorageState = {
  id: '',
  currentItems: [],
  workplaceItems: [],
  allItems: [],
  name: '',
  user: '',
  diskSpace: 0,
  usedSpace: 0,
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
      .addCase(changeIsTrash.fulfilled, (state, { payload }) => {
        const types = payload.map((item) => item.type);

        state.currentItems = [];
        state.allItems = state.allItems.map((item) => {
          if (types.includes(item.type)) {
            return payload.find((itm) => itm.id === item.id) || item;
          }

          return item;
        });
      })
      .addCase(deleteItems.fulfilled, (state, { payload }) => {
        const { diskSpace, usedSpace, folders, tracks, files, albums } = payload;

        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = [...folders, ...tracks, ...files, ...albums];
      })
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        state.allItems = [payload, ...state.allItems];
      })
      .addCase(fetchStorage.pending, (state) => {
        state.loading = true;
        state.id = '';
        state.name = '';
        state.user = '';
        state.diskSpace = 0;
        state.usedSpace = 0;
        state.allItems = [];
        state.currentItems = [];
      })
      .addCase(fetchStorage.fulfilled, (state, { payload }) => {
        const { id, name, user, diskSpace, usedSpace, folders, tracks, files, albums } = payload;

        state.loading = false;
        state.id = id;
        state.name = name;
        state.user = user;
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = [...folders, ...tracks, ...files, ...albums];
      })
      .addCase(fetchStorage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const storageActions = storageSlice.actions;
