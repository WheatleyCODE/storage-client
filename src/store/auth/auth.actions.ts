import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'services';
import { IAuthData, ILoginFilds, IRegisterFilds } from 'types';

export const register = createAsyncThunk<IAuthData, IRegisterFilds>(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await AuthService.registration(name, email, password);
      return data;
    } catch (e) {
      console.warn(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk<IAuthData, ILoginFilds>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await AuthService.login(email, password);
      return data;
    } catch (e) {
      console.warn(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);
