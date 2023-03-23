import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { FolderService, ItemsService } from 'services';
import { CacheData, getActionMessage } from 'helpers';
import { IChangeColorFilds, ICreateFolderFilds, IFolder, IChildrensData } from 'types';
// import { isManyItems } from 'utils';

export const createFolder = createAsyncThunk<IFolder, ICreateFolderFilds>(
  'storage/createFolder',
  async (filds, thunkAPI) => {
    try {
      const { data } = await FolderService.createFolder(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создана новая папка: ${data.name}`,
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeColor = createAsyncThunk<IFolder[], IChangeColorFilds>(
  'storage/changeColor',
  async (filds, thunkAPI) => {
    try {
      const { data } = await FolderService.changeColor(filds);

      thunkAPI.dispatch(storageActions.setItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

// ! Fix check change open date
export const getChildrens = createAsyncThunk<IChildrensData, string>(
  'storage/getChildrens',
  async (string, thunkAPI) => {
    try {
      thunkAPI.dispatch(storageActions.changeWorkplaceLoading(true));
      const cacheData = CacheData.getInstance();
      const dataCache = cacheData.get<IChildrensData>(string);

      if (dataCache) {
        cacheData.set(string, dataCache, 5000);
        thunkAPI.dispatch(storageActions.setChildrens(dataCache));
        return dataCache;
      }

      const { data } = await ItemsService.getChildrens(string);
      cacheData.set(string, data, 5000);

      thunkAPI.dispatch(storageActions.changeOpenDate(string));
      thunkAPI.dispatch(storageActions.setChildrens(data));
      thunkAPI.dispatch(storageActions.changeWorkplaceLoading(false));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
