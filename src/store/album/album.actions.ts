import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { AlbumService } from 'services';
import { getActionMessage } from 'helpers';
import { ICreateAlbumFilds, IAlbum } from 'types';

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

// ! Change Track, Image, Text
