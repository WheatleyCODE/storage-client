import { AsyncThunkAction } from '@reduxjs/toolkit';

export const getPassError = (isEqual: boolean, isTouchOne: boolean, isTouchTwo: boolean) => {
  if (!isEqual && isTouchOne && isTouchTwo) {
    return 'Пароли не совпадают';
  }

  return null;
};

export const checkRequestStatus = (data: AsyncThunkAction<any, any, any>): boolean => {
  const thunkData = data as any;

  if (thunkData?.meta?.requestStatus === 'fulfilled') return true;

  return false;
};

export const createFormData = (filds: any): FormData => {
  const formData = new FormData();

  Object.keys(filds).forEach((key) => {
    const data = filds[key];

    if (Array.isArray(data)) {
      data.forEach((string) => {
        formData.append(`${key}[]`, string);
      });

      return;
    }

    formData.append(key, data);
  });

  return formData;
};
