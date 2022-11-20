import {
  MdFolder,
  MdInsertDriveFile,
  MdLibraryMusic,
  MdAudiotrack,
  MdOutlineLink,
  MdPublic,
  MdLockOutline,
  MdFolderShared,
} from 'react-icons/md';
import { AccessTypes, ItemTypes, SortTypes } from 'types';

export const storageWorkplaceIcons = {
  [ItemTypes.FOLDER]: MdFolder,
  [ItemTypes.FILE]: MdInsertDriveFile,
  [ItemTypes.ALBUM]: MdLibraryMusic,
  [ItemTypes.TRACK]: MdAudiotrack,
  FOLDER_SHARED: MdFolderShared,
};

export const storageWorkplaceAccessIcons = {
  [AccessTypes.LINK]: MdOutlineLink,
  [AccessTypes.PUBLIC]: MdPublic,
  [AccessTypes.PRIVATE]: MdLockOutline,
};

export const sortItems = [
  {
    title: 'Название',
    sortType: SortTypes.NAME,
    sortTypeReverce: SortTypes.NAME_REVERCE,
  },
  {
    title: 'Доступ',
    sortType: SortTypes.ACCESS,
    sortTypeReverce: SortTypes.ACCESS_REVERCE,
  },
  {
    title: 'Дата открытия',
    sortType: SortTypes.DATE,
    sortTypeReverce: SortTypes.DATE_REVERCE,
  },
  {
    title: 'Размер',
    sortType: SortTypes.SIZE,
    sortTypeReverce: SortTypes.SIZE_REVERCE,
  },
];

export const ItemTypesArr = [ItemTypes.FOLDER, ItemTypes.TRACK, ItemTypes.FILE, ItemTypes.ALBUM];
