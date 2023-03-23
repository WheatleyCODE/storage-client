import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { TrackService } from 'services';
import { getActionMessage } from 'helpers';
import {
  IChangeTrackDataFilds,
  IChangeTrackFileFilds,
  IChangeTrackImageFilds,
  ICreateTrackFilds,
  ITrack,
} from 'types';

export const createTrack = createAsyncThunk<ITrack, ICreateTrackFilds>(
  'storage/createTrack',
  async (filds, thunkAPI) => {
    try {
      const { data } = await TrackService.create(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создан новый трек: ${data.name}`,
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

export const changeTrackFile = createAsyncThunk<ITrack, IChangeTrackFileFilds>(
  'storage/changeTrackFile',
  async (filds, thunkAPI) => {
    try {
      const { data } = await TrackService.changeFile(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Аудио файл был изменен',
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      thunkAPI.dispatch(storageActions.changeAlbumTracks([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeTrackImage = createAsyncThunk<ITrack, IChangeTrackImageFilds>(
  'storage/changeTrackImage',
  async (filds, thunkAPI) => {
    try {
      const { data } = await TrackService.changeImage(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Картинка была изменена',
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      thunkAPI.dispatch(storageActions.changeAlbumTracks([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeTrackData = createAsyncThunk<ITrack, IChangeTrackDataFilds>(
  'storage/changeTrackData',
  async (filds, thunkAPI) => {
    try {
      const { data } = await TrackService.changeData(filds);

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      thunkAPI.dispatch(storageActions.changeAlbumTracks([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
