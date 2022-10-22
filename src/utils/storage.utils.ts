import { COLOR_BLUE, COLOR_RED, COLOR_YELLOW } from 'consts';

export function getPercent(a: number, b: number): number {
  return Math.round(100 / (a / b));
}

export function getProgressColor(percent: number): string {
  if (percent > 70) return COLOR_RED;
  if (percent > 40) return COLOR_YELLOW;
  return COLOR_BLUE;
}

export function sizeFormat(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Байт';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
