import { POPUP_MENU_BR_HEIGHT, POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import { ICoords } from 'types';

export type PopupNumbers = {
  itemsCount: number;
  defaultCount: number;
  brCount: number;
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

export const getContextMenuHeight = (numbers: PopupNumbers): number => {
  const { itemsCount, defaultCount, brCount } = numbers;

  return (
    (itemsCount + defaultCount) * POPUP_MENU_ITEM_HEIGHT +
    brCount * POPUP_MENU_BR_HEIGHT +
    POPUP_MENU_PADDING
  );
};
