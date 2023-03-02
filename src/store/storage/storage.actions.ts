import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from 'services';
import { IStorageData, ISettingsData, IStorageSettings } from 'types';
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

export const changeSettings = createAsyncThunk<ISettingsData, IStorageSettings>(
  'storage/changeSettings',
  async (settings, thunkAPI) => {
    try {
      // Todo сделать настройки на сервере и сделать запрос

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Настроки сохранены',
        })
      );

      return settings;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
