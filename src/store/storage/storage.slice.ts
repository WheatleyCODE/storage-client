import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyFactory, StorageSorter } from 'helpers';
import {
  IChildrensData,
  IFolder,
  IStorageData,
  IStorageState,
  SortTypes,
  IServerItemData,
  ItemTypes,
} from 'types';
import { copyObject } from 'utils';
import { changeSettings, fetchStorage } from './storage.actions';

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
  isRecommend: true,
  isTools: true,
  likedItems: [],
  staredItems: [],
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,

  reducers: {
    setCurrent: (state, { payload }: PayloadAction<IServerItemData[]>) => {
      if (JSON.stringify(state.currentItems) !== JSON.stringify(payload)) {
        state.currentItems = payload;
      }
    },

    addCurrent: (state, { payload }: PayloadAction<IServerItemData>) => {
      if (!state.currentItems.find((item) => item.id === payload.id)) {
        state.currentItems = [...state.currentItems, payload];
      }
    },

    changeWorkplaceLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isWorkplaceLoading = payload;
    },

    changeLiked: (state, { payload }: PayloadAction<{ id: string; isLike: boolean }>) => {
      const { id, isLike } = payload;
      let liked = [...state.likedItems];
      const item = liked.find((str) => str === id);

      if (!item && isLike) {
        liked.push(id);
      }

      if (item && !isLike) {
        liked = liked.filter((str) => str !== id);
      }

      state.likedItems = liked;
    },

    changeStared: (state, { payload }: PayloadAction<{ id: string; isStar: boolean }>) => {
      const { id, isStar } = payload;
      let stared = [...state.likedItems];
      const item = stared.find((str) => str === id);

      if (!item && isStar) {
        stared.push(id);
      }

      if (item && !isStar) {
        stared = stared.filter((str) => str !== id);
      }

      state.staredItems = stared;
    },

    setWorkplace: (state, { payload }: PayloadAction<IServerItemData[]>) => {
      state.workplaceItems = payload;
    },

    setParents: (state, { payload }: PayloadAction<IFolder[]>) => {
      state.parents = payload;
    },

    changeOpenDate: (state, { payload }: PayloadAction<string>) => {
      const allIndex = state.allItems.findIndex((item) => item.id === payload);
      const workIndex = state.workplaceItems.findIndex((item) => item.id === payload);
      const parentIndex = state.parents.findIndex((item) => item.id === payload);

      if (allIndex !== -1) {
        const item = state.allItems[allIndex];
        item.openDate = Date.now();
        state.allItems[allIndex] = item;
      }

      if (workIndex !== -1) {
        const item = state.workplaceItems[workIndex];
        item.openDate = Date.now();
        state.workplaceItems[workIndex] = item;
      }

      if (parentIndex !== -1) {
        const item = state.parents[parentIndex];
        item.openDate = Date.now();
        state.parents[parentIndex] = item;
      }
    },

    setChildrens: (state, { payload }: PayloadAction<IChildrensData>) => {
      const sorter = new StorageSorter();
      state.parents = payload.parents;

      state.workplaceItems = sorter.sort(
        payload.childrens.filter((item) => !item.isTrash),
        state.sortType
      );

      state.isWorkplaceLoading = false;
    },

    setSortType: (state, { payload }: PayloadAction<SortTypes>) => {
      const sorter = new StorageSorter();
      state.sortType = payload;

      const allItemsArr = copyObject(state.allItems);
      const workplaceItemsArr = copyObject(state.workplaceItems);

      state.allItems = sorter.sort(allItemsArr, payload);
      state.workplaceItems = sorter.sort(workplaceItemsArr, payload);
    },

    setItems: (state, { payload }: PayloadAction<IServerItemData[]>) => {
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

      const allItemsArr = copyObject(newAllItems);
      const workplaceItemsArr = copyObject(newWorkplaceItems);

      state.allItems = sorter.sort(allItemsArr, state.sortType);
      state.workplaceItems = sorter.sort(workplaceItemsArr, state.sortType);
      state.parents = newParents;
    },

    addItems: (state, { payload }: PayloadAction<IServerItemData[]>) => {
      const sorter = new StorageSorter();

      const allItemsArr = copyObject(state.allItems);
      const workplaceItemsArr = copyObject(state.workplaceItems);

      state.allItems = sorter.sort([...allItemsArr, ...payload], state.sortType);
      state.workplaceItems = sorter.sort([...workplaceItemsArr, ...payload], state.sortType);

      const size = payload
        .map((item) => PropertyFactory.create(item))
        .reduce((acc, item) => acc + item.getSize(), 0);

      state.usedSpace += size;
    },

    deleteItems: (state, { payload }: PayloadAction<IStorageData>) => {
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
        isRecommend,
        isTools,
        likedItems,
        staredItems,
      } = payload;

      state.isTools = isTools;
      state.isRecommend = isRecommend;
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
      state.likedItems = likedItems;
      state.staredItems = staredItems;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changeSettings.fulfilled, (state, { payload }) => {
        state.isRecommend = payload.isRecommend;
        state.isTools = payload.isTools;
      })
      .addCase(fetchStorage.pending, (state) => {
        state.isTools = true;
        state.isRecommend = true;
        state.isLoading = true;
        state.id = '';
        state.name = '';
        state.user = '';
        state.diskSpace = 0;
        state.usedSpace = 0;
        state.allItems = [];
        state.currentItems = [];
        state.parents = [];
        state.likedItems = [];
        state.staredItems = [];
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
          isRecommend,
          isTools,
          likedItems,
          staredItems,
        } = payload;

        state.isTools = isTools;
        state.isRecommend = isRecommend;
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
        state.likedItems = likedItems;
        state.staredItems = staredItems;
      })
      .addCase(fetchStorage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const storageActions = storageSlice.actions;
