import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types';
import { login, register } from './auth.actions';
import { IAuthState } from './auth.interface';

const initialState: IAuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
  accessToken: '',
  refreshToken: '',
  message: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.message = null;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { user, accessToken, refreshToken } = payload;
        state.isLoading = false;

        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.user = {} as IUser;
        state.accessToken = '';
        state.refreshToken = '';
      })
      .addCase(login.pending, (state) => {
        state.message = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user, accessToken, refreshToken } = payload;
        state.isLoading = false;
        state.isAuth = true;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(login.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false;
        state.user = {} as IUser;
        state.accessToken = '';
        state.refreshToken = '';
      });
  },
});
