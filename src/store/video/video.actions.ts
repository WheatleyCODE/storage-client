import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { VideoService } from 'services';
import { getActionMessage } from 'helpers';
import {
  IChangeVideoDataFilds,
  IChangeVideoFileFilds,
  IChangeVideoImageFilds,
  ICreateVideoFilds,
  IVideo,
} from 'types';

export const createVideo = createAsyncThunk<IVideo, ICreateVideoFilds>(
  'storage/createVideo',
  async (filds, thunkAPI) => {
    try {
      const { data } = await VideoService.createVideo(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создано новое видео: ${data.name}`,
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

export const changeVideoFile = createAsyncThunk<IVideo, IChangeVideoFileFilds>(
  'storage/changeVideoFile',
  async (filds, thunkAPI) => {
    try {
      const { data } = await VideoService.changeFile(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Видео было изменено',
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeVideoImage = createAsyncThunk<IVideo, IChangeVideoImageFilds>(
  'storage/changeVideoImage',
  async (filds, thunkAPI) => {
    try {
      const { data } = await VideoService.changeImage(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Картинка была изменена',
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeVideoData = createAsyncThunk<IVideo, IChangeVideoDataFilds>(
  'storage/changeVideoData',
  async (filds, thunkAPI) => {
    try {
      const { data } = await VideoService.changeData(filds);

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
