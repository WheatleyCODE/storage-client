import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { VideoService } from 'services';
import { getActionMessage } from 'helpers';
import { ICreateVideoFilds, IVideo } from 'types';

export const createVideo = createAsyncThunk<IVideo, ICreateVideoFilds>(
  'storage/createVideo',
  async (filds, thunkAPI) => {
    try {
      const { data } = await VideoService.createVideo(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создано новое видео: ${data.name}`,
        })
      );

      thunkAPI.dispatch(storageActions.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
