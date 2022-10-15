export const getPassError = (isEqual: boolean, isTouchOne: boolean, isTouchTwo: boolean) => {
  if (!isEqual && isTouchOne && isTouchTwo) {
    return 'Пароли не совпадают';
  }

  return null;
};

export type IEqualParam = string | number | object;

export const isEqual = (a: IEqualParam, b: IEqualParam): boolean => {
  if (typeof a === 'object' && typeof a === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
};
