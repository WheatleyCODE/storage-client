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
