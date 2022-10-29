import { createAsyncThunk } from '@reduxjs/toolkit';
import { emitMessage } from 'helpers';
import { AuthService } from 'services';
import {
  IAuthData,
  IChangePasswordData,
  IChangePassworrdFilds,
  ILoginFilds,
  IRegisterFilds,
  IResetPasswordData,
} from 'types';
import { removeToken, setToken } from 'utils';

export const register = createAsyncThunk<IAuthData, IRegisterFilds>(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await AuthService.registration(name, email, password);

      emitMessage({
        color: 'yellow',
        message: `На вашу: ${email} почту было выслано письмо для активации аккаунта`,
      });

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const login = createAsyncThunk<IAuthData, ILoginFilds>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await AuthService.login(email, password);

      setToken(data.accessToken);

      emitMessage({
        color: 'green',
        message: 'Вы успешно вошли в систему',
      });

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const checkAuth = createAsyncThunk<IAuthData>('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const { data } = await AuthService.refresh();

    setToken(data.accessToken);

    emitMessage({
      color: 'green',
      message: 'Вы успешно вошли в систему',
    });

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const logout = createAsyncThunk<void>('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();

    removeToken();

    return emitMessage({
      color: 'default',
      message: 'Вы вышли из системы',
    });
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const activateAndLogin = createAsyncThunk<IAuthData, string>(
  'auth/activateAndLogin',
  async (link, thunkAPI) => {
    try {
      const { data } = await AuthService.activateAndLogin(link);

      setToken(data.accessToken);

      emitMessage({
        color: 'green',
        message: 'Вы успешно активировали аккаунт',
      });

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const resetPassword = createAsyncThunk<IResetPasswordData, string>(
  'auth/resetPassword',
  async (email, thunkAPI) => {
    try {
      const { data } = await AuthService.resetPassword(email);

      emitMessage({
        color: 'yellow',
        message: `На вашу почту: ${email} было выслано письмо с ссылкой для сброса пароля`,
      });

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changePassword = createAsyncThunk<IChangePasswordData, IChangePassworrdFilds>(
  'auth/changePassword',
  async ({ password, link }, thunkAPI) => {
    try {
      const { data } = await AuthService.changePassword(password, link);

      emitMessage({
        color: 'green',
        message: 'Ваш пароль успешно изменён',
      });

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
