import {
  COLOR_BLUE,
  COLOR_RED,
  COLOR_YELLOW,
  POPUP_MENU_BR_HEIGHT,
  POPUP_MENU_ITEM_HEIGHT,
  POPUP_MENU_PADDING,
} from 'consts';
import { ICoords, WorkplaceItem } from 'types';

export function getPercent(a: number, b: number): number {
  return Math.round(100 / (a / b));
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

export const getProgressColor = (percent: number): string => {
  if (percent > 70) return COLOR_RED;
  if (percent > 40) return COLOR_YELLOW;
  return COLOR_BLUE;
};

export const formatSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Байт';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const getContextMenuCoords = (e: React.MouseEvent): ICoords => {
  const pageHeight = document.documentElement.scrollHeight;
  const normWidth = window.innerWidth / 4.5;
  const normHeight = window.innerHeight / 12;
  const { platform } = window.navigator;
  const newCoords = {} as { top?: number; right?: number; left?: number; bottom?: number };
  newCoords.top = e.clientY + window.pageYOffset;
  newCoords.left = e.clientX;

  if (e.screenX > normWidth * 3) {
    newCoords.right = 0;

    if (pageHeight > window.innerHeight && platform === 'Win32') {
      newCoords.right = -20;
    }

    newCoords.right += window.innerWidth - e.clientX;
    newCoords.left = undefined;
  }

  if (e.screenY > normHeight * 8) {
    newCoords.top = undefined;
    newCoords.bottom = window.innerHeight - e.clientY - window.pageYOffset;
  }

  return {
    top: newCoords.top ? `${newCoords.top}px` : undefined,
    left: newCoords.left ? `${newCoords.left}px` : undefined,
    right: newCoords.right ? `${newCoords.right}px` : undefined,
    bottom: newCoords.bottom ? `${newCoords.bottom}px` : undefined,
  };
};

export type PopupNumbers = {
  itemsCount: number;
  defaultCount: number;
  brCount: number;
};

export const getContextMenuHeight = (numbers: PopupNumbers): number => {
  const { itemsCount, defaultCount, brCount } = numbers;

  return (
    (itemsCount + defaultCount) * POPUP_MENU_ITEM_HEIGHT +
    brCount * POPUP_MENU_BR_HEIGHT +
    POPUP_MENU_PADDING
  );
};

export const getWorkplaceUrl = (item: WorkplaceItem): string => {
  return `/storage/${item.type.toLocaleLowerCase()}s/${item.id}`;
};
