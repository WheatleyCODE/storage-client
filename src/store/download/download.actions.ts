import { createAsyncThunk } from '@reduxjs/toolkit';
import { DownloadService } from 'services';
import { getActionMessage } from 'helpers';
import { IDownloadArchiveFilds } from 'types';

export const downloadAcrhive = createAsyncThunk<any, IDownloadArchiveFilds>(
  'storage/downloadArhive',
  async (filds, thunkAPI) => {
    try {
      await DownloadService.downloadArchive(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Загрузка архива',
        })
      );

      return {};
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
