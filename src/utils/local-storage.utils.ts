import { LocalStorageKeys } from 'types';

export const getLSData = <T>(key: LocalStorageKeys): T | false => {
  const data = localStorage.getItem(key);

  if (data) return JSON.parse(data);

  return false;
};

export const setLSData = (key: LocalStorageKeys, data: any): void => {
  const string = JSON.stringify(data);
  localStorage.setItem(key, string);
};

export const setToken = (token: string): void => {
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
};

export const checkToken = (): boolean => {
  if (localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)) return true;

  return false;
};
