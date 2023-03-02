import { createAsyncThunk } from '@reduxjs/toolkit';
// import { storageActions } from 'store';
import { DownloadService } from 'services';
import { getActionMessage } from 'helpers';
import { IDownloadFileFilds, IDownloadArchiveFilds } from 'types';

export const downloadFile = createAsyncThunk<any, IDownloadFileFilds>(
  'storage/downloadFiles',
  async (filds, thunkAPI) => {
    try {
      await DownloadService.downloadFile(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Загрузка файла',
        })
      );

      return {};
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

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
