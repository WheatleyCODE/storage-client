import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from 'services';
import { createChangeIsTrashMessage } from 'utils';
import {
  IChangeIsTrashFilds,
  ICreateFolderFilds,
  IDeleteItemsFilds,
  IFolder,
  IStorageData,
  RestoreActionNames,
  WorkplaceItem,
} from 'types';
import { getActionMessage } from 'helpers';

export const fetchStorage = createAsyncThunk<IStorageData>(
  'storage/fetchStorage',
  async (_, thunkAPI) => {
    try {
      const { data } = await StorageService.fetchStorage();

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const createFolder = createAsyncThunk<IFolder, ICreateFolderFilds>(
  'storage/createFolder',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.createFolder(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создана новая папка: ${data.name}`,
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeIsTrash = createAsyncThunk<WorkplaceItem[], IChangeIsTrashFilds>(
  'storage/changeIsTrashServer',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.changeIsTrash(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: createChangeIsTrashMessage(filds),
          restoreActionName: RestoreActionNames.CHANGE_IS_THASH,
          restoreParams: { ...filds, isTrash: !filds.isTrash },
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const deleteItems = createAsyncThunk<IStorageData, IDeleteItemsFilds>(
  'storage/deleteItems',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.deleteItems(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Успешно удалено',
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
