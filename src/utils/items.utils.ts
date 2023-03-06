import { IconType } from 'react-icons';
import { BASE_URL, storageWorkplaceIcons } from 'consts';
import { AccessTypes, IClientItemData, ItemTypes } from 'types';

export const getColorClassName = (item: IClientItemData): string => {
  if (item.color) {
    return item.color.toLocaleLowerCase();
  }

  return '';
};

export const transformDate = (date: number): string => new Date(date).toLocaleDateString();

export const transformAccess = (type: AccessTypes): string => {
  if (type === AccessTypes.LINK) return 'По cсылке';
  if (type === AccessTypes.PRIVATE) return 'Только я';
  return 'Публичный';
};

export const getImageLink = (item: IClientItemData): string | false => {
  if (!item.getImagePath()) return false;

  return `${BASE_URL}/${item.getImagePath()}`;
};

export const getFileLink = (item: IClientItemData): string | false => {
  if (!item.getImagePath()) return false;

  return `${BASE_URL}/${item.getFilePath()}`;
};

export const getWorkplaceIcon = (item: IClientItemData): IconType => {
  const { accessType, type } = item;

  const isAccess = accessType === AccessTypes.LINK || accessType === AccessTypes.PUBLIC;

  if (isAccess && type === ItemTypes.FOLDER) {
    return storageWorkplaceIcons.FOLDER_SHARED;
  }

  return storageWorkplaceIcons[type];
};

export const formatSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Байт';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};
