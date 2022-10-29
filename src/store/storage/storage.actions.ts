import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from 'services';
import { IStorageState } from 'types';

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
