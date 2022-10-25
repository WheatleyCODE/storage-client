import { FaRegHdd, FaRegShareSquare, FaRegClock, FaRegStar, FaRegTrashAlt } from 'react-icons/fa';
import { FcCalendar, FcIdea, FcOk } from 'react-icons/fc';
import { GiAcidBlob, GiVideoCamera, GiMusicSpell } from 'react-icons/gi';
import { AdditionTypes, PathRoutes } from 'types';

export const ITEM_WIDTH = 190;
export const COLOR_BLUE = '#1573ff';
export const COLOR_YELLOW = '#ffc934';
export const COLOR_RED = '#f7192f';

export const storageMenu = [
  { title: 'Мой диск', path: PathRoutes.STORAGE_MY_DRIVE, Icon: FaRegHdd },
  { title: 'Доступные мне', path: PathRoutes.STORAGE_SHARED, Icon: FaRegShareSquare },
  { title: 'Недавние', path: PathRoutes.STORAGE_RECENT, Icon: FaRegClock },
  { title: 'Отмеченные', path: PathRoutes.STORAGE_STARRED, Icon: FaRegStar },
  { title: 'Корзина', path: PathRoutes.STORAGE_TRASH, Icon: FaRegTrashAlt },
];

export const allApps = [
  {
    Icon: GiAcidBlob,
    title: 'Storage',
    path: PathRoutes.STORAGE_MY_DRIVE,
  },
  {
    Icon: GiVideoCamera,
    title: 'VideoTube',
    path: PathRoutes.STORAGE_MY_DRIVE,
  },
  {
    Icon: GiMusicSpell,
    title: 'MusicSpot',
    path: PathRoutes.STORAGE_MY_DRIVE,
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
