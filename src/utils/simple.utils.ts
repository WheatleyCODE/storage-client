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
