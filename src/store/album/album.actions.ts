import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { AlbumService } from 'services';
import { getActionMessage } from 'helpers';
import {
  ICreateAlbumFilds,
  IAlbum,
  IChangeAlbumTracksFilds,
  IChangeAlbumImageFilds,
  IChangeAlbumDataFilds,
} from 'types';

export const createAlbum = createAsyncThunk<IAlbum, ICreateAlbumFilds>(
  'storage/createAlbum',
  async (filds, thunkAPI) => {
    try {
      const { data } = await AlbumService.createAlbum(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создан новый альбом: ${data.name}`,
        })
      );

      thunkAPI.dispatch(storageActions.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeAlbumTracks = createAsyncThunk<IAlbum, IChangeAlbumTracksFilds>(
  'storage/changeAlbumTracks',
  async (filds, thunkAPI) => {
    try {
      const { data } = await AlbumService.changeTracks(filds);

      console.log(data);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Треки были изменены',
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

export const changeAlbumImage = createAsyncThunk<IAlbum, IChangeAlbumImageFilds>(
  'storage/changeAlbumImage',
  async (filds, thunkAPI) => {
    try {
      const { data } = await AlbumService.changeImage(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Картинка была изменена',
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

export const changeAlbumData = createAsyncThunk<IAlbum, IChangeAlbumDataFilds>(
  'storage/changeAlbumImage',
  async (filds, thunkAPI) => {
    try {
      const { data } = await AlbumService.changeData(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Информация была изменена',
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
