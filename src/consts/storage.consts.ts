import { FaRegHdd, FaRegShareSquare, FaRegClock, FaRegStar, FaRegTrashAlt } from 'react-icons/fa';
import { PathRoutes } from 'types';

export const ITEM_WIDTH = 190;

export const storageMenu = [
  { title: 'Мой диск', path: PathRoutes.STORAGE, Icon: FaRegHdd },
  { title: 'Доступные мне', path: PathRoutes.STORAGE_SHARED, Icon: FaRegShareSquare },
  { title: 'Недавние', path: PathRoutes.STORAGE_RECENT, Icon: FaRegClock },
  { title: 'Отмеченные', path: PathRoutes.STORAGE_STARRED, Icon: FaRegStar },
  { title: 'Корзина', path: PathRoutes.STORAGE_TRASH, Icon: FaRegTrashAlt },
];
