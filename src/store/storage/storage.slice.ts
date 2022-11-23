import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageSorter } from 'helpers';
import { IFolder, IStorageState, SortTypes, WorkplaceItem } from 'types';
import {
  changeSettings,
  createAccessLink,
  createAlbum,
  createFolder,
  createTrack,
  deleteItems,
  fetchStorage,
  getChildrens,
  uploadFiles,
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
  isWorkplaceLoading: false,
  sortType: SortTypes.NAME,
  settings: {
    isRecommend: true,
    isTools: true,
  },
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

    setSortType: (state, { payload }: PayloadAction<SortTypes>) => {
      const sorter = new StorageSorter();
      state.sortType = payload;

      const allItemsArr = JSON.parse(JSON.stringify(state.allItems));
      const workplaceItemsArr = JSON.parse(JSON.stringify(state.workplaceItems));

      state.allItems = sorter.sort(allItemsArr, payload);
      state.workplaceItems = sorter.sort(workplaceItemsArr, payload);
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
      .addCase(uploadFiles.fulfilled, (state, { payload }) => {
        const sorter = new StorageSorter();

        const allItemsArr = JSON.parse(JSON.stringify(state.allItems));
        const workplaceItemsArr = JSON.parse(JSON.stringify(state.workplaceItems));

        state.allItems = sorter.sort([...allItemsArr, ...payload], state.sortType);
        state.workplaceItems = sorter.sort([...workplaceItemsArr, ...payload], state.sortType);
      })
      .addCase(changeSettings.fulfilled, (state, { payload }) => {
        state.settings = payload;
      })
      .addCase(getChildrens.pending, (state) => {
        state.isWorkplaceLoading = true;
      })
      .addCase(getChildrens.fulfilled, (state, { payload }) => {
        const sorter = new StorageSorter();
        state.parents = payload.parents;

        state.workplaceItems = sorter.sort(
          payload.childrens.filter((item) => !item.isTrash),
          state.sortType
        );

        state.isWorkplaceLoading = false;
      })
      .addCase(getChildrens.rejected, (state) => {
        state.isWorkplaceLoading = false;
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
        const { diskSpace, usedSpace, folders, tracks, files, albums, images, videos } = payload;

        state.currentItems = [];
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = [...folders, ...tracks, ...files, ...albums, ...images, ...videos];
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
      .addCase(createAlbum.fulfilled, (state, { payload }) => {
        const { imageSize } = payload;
        state.allItems = [...state.allItems, payload];
        state.usedSpace += imageSize;
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
        const sorter = new StorageSorter();
        const {
          id,
          name,
          user,
          diskSpace,
          usedSpace,
          folders,
          tracks,
          files,
          albums,
          images,
          videos,
        } = payload;

        state.isLoading = false;
        state.id = id;
        state.name = name;
        state.user = user;
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = sorter.sort(
          [...folders, ...tracks, ...files, ...albums, ...images, ...videos],
          state.sortType
        );
      })
      .addCase(fetchStorage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const storageActions = storageSlice.actions;
