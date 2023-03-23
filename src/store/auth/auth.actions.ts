import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActionMessage } from 'helpers';
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

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `На вашу: ${email} почту было выслано письмо для активации аккаунта`,
          isRestore: false,
        })
      );

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

      thunkAPI.dispatch(
        getActionMessage({
          color: 'green',
          text: 'Вы успешно вошли в систему',
          isRestore: false,
        })
      );

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

    thunkAPI.dispatch(
      getActionMessage({
        color: 'green',
        text: 'Вы успешно вошли в систему',
        isRestore: false,
      })
    );

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const logout = createAsyncThunk<void>('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();

    thunkAPI.dispatch(
      getActionMessage({
        color: 'default',
        text: 'Вы вышли из системы',
        isRestore: false,
      })
    );

    return removeToken();
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

      thunkAPI.dispatch(
        getActionMessage({
          color: 'green',
          text: 'Вы успешно активировали аккаунт',
          isRestore: false,
        })
      );

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

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `На вашу почту: ${email} было выслано письмо с ссылкой для сброса пароля`,
          isRestore: false,
        })
      );

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

      thunkAPI.dispatch(
        getActionMessage({
          color: 'green',
          text: 'Ваш пароль успешно изменён',
          isRestore: false,
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
