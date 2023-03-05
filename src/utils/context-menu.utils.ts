import { POPUP_MENU_BR_HEIGHT, POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import { ICoords } from 'types';

export type PopupNumbers = {
  itemsCount: number;
  defaultCount: number;
  brCount: number;
};

export const getContextMenuCoords = (e: React.MouseEvent<HTMLDivElement>): ICoords => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = e.clientX;
  const y = e.clientY;
  const contextWidth = 320;
  const contextHeight = 500;
  const mobileWidth = 520;
  const coords = {} as { top?: number; right?: number; left?: number; bottom?: number };

  coords.top = y;
  coords.left = x;

  if (width < mobileWidth) {
    return {
      top: '0px',
      left: '0px',
      right: undefined,
      bottom: undefined,
    };
  }

  if (width - x < contextWidth) {
    coords.right = width - e.clientX;
    coords.left = undefined;
  }

  if (height - y < contextHeight) {
    coords.top = undefined;
    coords.bottom = window.innerHeight - e.clientY;
  }

  return {
    top: coords.top ? `${coords.top}px` : undefined,
    left: coords.left ? `${coords.left}px` : undefined,
    right: coords.right ? `${coords.right}px` : undefined,
    bottom: coords.bottom ? `${coords.bottom}px` : undefined,
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
