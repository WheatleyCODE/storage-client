import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFolder, IStorageState, WorkplaceItem } from 'types';
import {
  createAccessLink,
  createFolder,
  createTrack,
  deleteItems,
  fetchStorage,
  getChildrens,
} from './storage.actions';

const initialState: IStorageState = {
  id: '',
  currentItems: [],
  workplaceItems: [],
  parents: [],
  allItems: [],
  name: '',
  user: '',
  diskSpace: 0,
  usedSpace: 0,
  isLoading: true,
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

    setParents: (state, { payload }: PayloadAction<IFolder[]>) => {
      state.parents = payload;
    },

    setItem: (state, { payload }: PayloadAction<WorkplaceItem>) => {
      const { id } = payload;

      state.parents = state.parents.map((item) => {
        if (item.id === id) {
          return payload as IFolder;
        }

        return item;
      });

      state.workplaceItems = state.workplaceItems.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });

      state.allItems = state.allItems.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });
    },

    setItems: (state, { payload }: PayloadAction<WorkplaceItem[]>) => {
      const types = payload.map((item) => item.type);

      state.parents = state.parents.map((item) => {
        if (types.includes(item.type)) {
          return (payload.find((itm) => itm.id === item.id) as IFolder) || item;
        }

        return item;
      });

      state.workplaceItems = state.workplaceItems.map((item) => {
        if (types.includes(item.type)) {
          return payload.find((itm) => itm.id === item.id) || item;
        }

        return item;
      });

      state.allItems = state.allItems.map((item) => {
        if (types.includes(item.type)) {
          return payload.find((itm) => itm.id === item.id) || item;
        }

        return item;
      });
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getChildrens.fulfilled, (state, { payload }) => {
        state.parents = payload.parents;
        state.workplaceItems = payload.childrens.filter((item) => !item.isTrash);
      })
      .addCase(createAccessLink.fulfilled, (state, { payload }) => {
        const { id } = payload;

        state.currentItems = [payload];

        state.parents = state.parents.map((item) => {
          if (item.id === id) {
            return payload as IFolder;
          }

          return item;
        });

        state.workplaceItems = state.workplaceItems.map((item) => {
          if (item.id === id) {
            return payload;
          }

          return item;
        });

        state.allItems = state.allItems.map((item) => {
          if (item.id === id) {
            return payload;
          }

          return item;
        });
      })
      .addCase(deleteItems.fulfilled, (state, { payload }) => {
        const { diskSpace, usedSpace, folders, tracks, files, albums } = payload;

        state.currentItems = [];
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = [...folders, ...tracks, ...files, ...albums];
      })
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        state.allItems = [...state.allItems, payload];
        state.usedSpace += payload.folderSize;
      })
      .addCase(createTrack.fulfilled, (state, { payload }) => {
        const { imageSize, audioSize } = payload;
        state.allItems = [...state.allItems, payload];
        state.usedSpace += (imageSize || 0) + audioSize;
      })
      .addCase(fetchStorage.pending, (state) => {
        state.isLoading = true;
        state.id = '';
        state.name = '';
        state.user = '';
        state.diskSpace = 0;
        state.usedSpace = 0;
        state.allItems = [];
        state.currentItems = [];
        state.parents = [];
      })
      .addCase(fetchStorage.fulfilled, (state, { payload }) => {
        const { id, name, user, diskSpace, usedSpace, folders, tracks, files, albums } = payload;

        state.isLoading = false;
        state.id = id;
        state.name = name;
        state.user = user;
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = [...folders, ...tracks, ...files, ...albums];
      })
      .addCase(fetchStorage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const storageActions = storageSlice.actions;
