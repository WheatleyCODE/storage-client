import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageSorter } from 'helpers';
import { IFolder, IStorageState, SortTypes, WorkplaceItem } from 'types';
import { getSize } from 'utils';
import {
  changeSettings,
  copyFiles,
  createAlbum,
  createFolder,
  createTrack,
  createVideo,
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

    setItems: (state, { payload }: PayloadAction<WorkplaceItem[]>) => {
      const types = payload.map((item) => item.type);
      const sorter = new StorageSorter();

      const newParents = state.parents.map((item) => {
        if (types.includes(item.type)) {
          return (payload.find((itm) => itm.id === item.id) as IFolder) || item;
        }
        return item;
      });

      let newWorkplaceItems = state.workplaceItems
        .map((item) => {
          if (types.includes(item.type)) {
            return payload.find((itm) => itm.id === item.id) || item;
          }
          return item;
        })
        .filter((item) => !item.isTrash);

      if (newParents.length) {
        const parent = newParents[newParents.length - 1];
        newWorkplaceItems = newWorkplaceItems.filter((item) => item.parent === parent.id);
      }

      const newAllItems = state.allItems.map((item) => {
        if (types.includes(item.type)) {
          return payload.find((itm) => itm.id === item.id) || item;
        }
        return item;
      });

      const allItemsArr = JSON.parse(JSON.stringify(newAllItems));
      const workplaceItemsArr = JSON.parse(JSON.stringify(newWorkplaceItems));

      state.allItems = sorter.sort(allItemsArr, state.sortType);
      state.workplaceItems = sorter.sort(workplaceItemsArr, state.sortType);
      state.parents = newParents;
    },

    addItems: (state, { payload }: PayloadAction<WorkplaceItem[]>) => {
      const sorter = new StorageSorter();

      const allItemsArr = JSON.parse(JSON.stringify(state.allItems));
      const workplaceItemsArr = JSON.parse(JSON.stringify(state.workplaceItems));

      state.allItems = sorter.sort([...allItemsArr, ...payload], state.sortType);
      state.workplaceItems = sorter.sort([...workplaceItemsArr, ...payload], state.sortType);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(copyFiles.fulfilled, (state, { payload }) => {
        const size = payload.reduce((total, item) => (total += getSize(item)), 0);
        state.usedSpace += size;
      })
      .addCase(uploadFiles.fulfilled, (state, { payload }) => {
        const size = payload.reduce((total, item) => (total += getSize(item)), 0);
        state.usedSpace += size;
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
      .addCase(deleteItems.fulfilled, (state, { payload }) => {
        const { diskSpace, usedSpace, folders, tracks, files, albums, images, videos } = payload;

        state.currentItems = [];
        state.diskSpace = diskSpace;
        state.usedSpace = usedSpace;
        state.allItems = [...folders, ...tracks, ...files, ...albums, ...images, ...videos];
        state.workplaceItems = state.workplaceItems.filter((item) => item.isTrash);
      })
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        state.usedSpace += payload.folderSize;
      })
      .addCase(createTrack.fulfilled, (state, { payload }) => {
        const { imageSize, audioSize } = payload;
        state.usedSpace += (imageSize || 0) + audioSize;
      })
      .addCase(createVideo.fulfilled, (state, { payload }) => {
        const { imageSize, videoSize } = payload;
        state.usedSpace += (imageSize || 0) + videoSize;
      })
      .addCase(createAlbum.fulfilled, (state, { payload }) => {
        const { imageSize } = payload;
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
