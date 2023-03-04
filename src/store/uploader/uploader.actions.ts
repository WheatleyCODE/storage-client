import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions, uploaderActions } from 'store';
import { UploadService } from 'services';
import { getActionMessage } from 'helpers';
import { IServerItemData, IUploadFilesFilds } from 'types';

export const uploadFiles = createAsyncThunk<IServerItemData[], IUploadFilesFilds>(
  'storage/uploadFiles',
  async (filds, thunkAPI) => {
    try {
      thunkAPI.dispatch(uploaderActions.setIsOpen(true));
      thunkAPI.dispatch(uploaderActions.setIsUpload(false));
      thunkAPI.dispatch(uploaderActions.setFileNames(filds.files.map((file) => file.name)));

      const { data } = await UploadService.uploadFiles(filds, thunkAPI.dispatch);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Загрузка завершена',
        })
      );

      thunkAPI.dispatch(uploaderActions.setIsUpload(true));
      thunkAPI.dispatch(storageActions.addItems(data));

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
