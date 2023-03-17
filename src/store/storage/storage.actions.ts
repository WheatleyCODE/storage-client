import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from 'services';
import { IStorageData, IStorageSettings } from 'types';
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

export const changeSettings = createAsyncThunk<IStorageData, IStorageSettings>(
  'storage/changeSettings',
  async (settings, thunkAPI) => {
    try {
      const { data } = await StorageService.changeSettings(settings);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Настроки сохранены',
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
