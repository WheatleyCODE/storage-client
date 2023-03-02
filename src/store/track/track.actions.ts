import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { TrackService } from 'services';
import { getActionMessage } from 'helpers';
import { ICreateTrackFilds, ITrack } from 'types';

export const createTrack = createAsyncThunk<ITrack, ICreateTrackFilds>(
  'storage/createTrack',
  async (filds, thunkAPI) => {
    try {
      const { data } = await TrackService.createTrack(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создан новый трек: ${data.name}`,
        })
      );

      thunkAPI.dispatch(storageActions.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
