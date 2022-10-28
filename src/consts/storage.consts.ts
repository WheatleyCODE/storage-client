import {
  FcCalendar,
  FcIdea,
  FcOk,
  FcClock,
  FcEmptyTrash,
  FcMultipleDevices,
  FcShare,
  FcSafe,
  FcMusic,
  FcBookmark,
  FcVideoCall,
} from 'react-icons/fc';
import { AdditionTypes, PathRoutes } from 'types';

export const ITEM_WIDTH = 190;
export const COLOR_BLUE = '#1573ff';
export const COLOR_YELLOW = '#ffc934';
export const COLOR_RED = '#f7192f';

export const POPUP_MENU_ITEM_HEIGHT = 40;
export const POPUP_MENU_PADDING = 30;
export const POPUP_MENU_BR_HEIGHT = 11;

export const storageMenu = [
  { title: 'Мой диск', path: PathRoutes.STORAGE_MY_DRIVE, Icon: FcMultipleDevices },
  { title: 'Доступные мне', path: PathRoutes.STORAGE_SHARED, Icon: FcShare },
  { title: 'Недавние', path: PathRoutes.STORAGE_RECENT, Icon: FcClock },
  { title: 'Отмеченные', path: PathRoutes.STORAGE_STARRED, Icon: FcBookmark },
  { title: 'Корзина', path: PathRoutes.STORAGE_TRASH, Icon: FcEmptyTrash },
];

export const allApps = [
  {
    Icon: FcSafe,
    title: 'Storage',
    path: PathRoutes.STORAGE_MY_DRIVE,
  },
  {
    Icon: FcVideoCall,
    title: 'VideoTube',
    path: PathRoutes.STORAGE_MY_DRIVE,
  },
  {
    Icon: FcMusic,
    title: 'MusicSpot',
    path: PathRoutes.STORAGE_MY_DRIVE,
  },
];

export const storageSettings = [
  {
    title: 'Настройки',
    hash: PathRoutes.STORAGE_SETTINGS,
  },
  {
    title: 'Горячие клавиши',
    hash: PathRoutes.STORAGE_HOTKEYS,
  },
];

export const settingsAndHotkeysStoragePages: string[] = [
  PathRoutes.STORAGE_MY_DRIVE,
  PathRoutes.STORAGE_RECENT,
  PathRoutes.STORAGE_SHARED,
  PathRoutes.STORAGE_STARRED,
  PathRoutes.STORAGE_TRASH,
];

export const additionIcons = [
  {
    Icon: FcCalendar,
    type: AdditionTypes.CALENDAR,
  },
  {
    Icon: FcIdea,
    type: AdditionTypes.KEEP,
  },
  {
    Icon: FcOk,
    type: AdditionTypes.TODO,
  },
];
