import { LocalStorageKeys } from 'types';

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
