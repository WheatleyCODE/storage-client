export type IEqualParam = string | number | object;

export const isEqual = (a: IEqualParam, b: IEqualParam): boolean => {
  if (typeof a === 'object' && typeof a === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
};

export const getFirstLetter = (str: string): string => {
  return str.split('')[0].toLocaleUpperCase();
};

export const copyObject = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export function getPercent(a: number, b: number): number {
  return Math.round(100 / (a / b));
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

export const getPercentOfNumber = (num: number, perc: number) => (num / 100) * perc;
export const numOfNumPercent = (numOne: number, numTwo: number) => (numOne / numTwo) * 100;
export const correctVolume = (volume: number) => volume / 100;

export const formatTime = (s: number) => {
  return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
};

export const isUndefined = (value: any) => typeof value === 'undefined';

export const isManyItems = (obj: { items: any[] }) => obj.items.length > 1;

export const isTypePending = (str: string): boolean => {
  const arr = str.split('/');

  if (arr.pop() === 'pending') return true;

  return false;
};

export const isTypeFulfilled = (str: string): boolean => {
  const arr = str.split('/');

  if (arr.pop() === 'fulfilled') return true;

  return false;
};

export const isTypeRejected = (str: string): boolean => {
  const arr = str.split('/');

  if (arr.pop() === 'rejected') return true;

  return false;
};
