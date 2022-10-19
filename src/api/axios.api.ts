/* eslint-disable @typescript-eslint/return-await */
import axios from 'axios';
import { BASE_URL } from 'consts';
import { IAuthData, LocalStorageKeys } from 'types';

const axiosIstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

axiosIstance.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};
  config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`;
  return config;
});

axiosIstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const res = await axios.get<IAuthData>(`${BASE_URL}/api/auth/refresh`, {
          withCredentials: true,
        });
        const authResponse = res.data;
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, authResponse.accessToken);

        return await axiosIstance.request(originalRequest);
      } catch (e) {
        console.warn('Пользователь не авторизован');
      }
    }

    throw error;
  }
);

export const $api = axiosIstance;
