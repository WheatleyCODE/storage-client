import { createAsyncThunk } from '@reduxjs/toolkit';
import { emitMessage } from 'helpers';
import { StorageService } from 'services';
import { ICreateFolderFilds, IFolder, IStorageState } from 'types';

export const fetchStorage = createAsyncThunk<IStorageState>(
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

      emitMessage({
        color: 'default',
        message: `Создана новая папка: ${data.name}`,
      });

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
