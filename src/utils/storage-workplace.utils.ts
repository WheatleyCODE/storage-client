import { AccessTypes, ItemTypes, WorkplaceItem, IChangeIsTrashFilds, IFolder } from 'types';
import { IFile } from 'types/file.interface';
import { ITrack } from 'types/track.interface';
import { formatSize } from './storage.utils';

export const transformDate = (date: number): string => new Date(date).toLocaleDateString();

export const transformAccess = (type: AccessTypes): string => {
  if (type === AccessTypes.LINK) return 'По cсылке';
  if (type === AccessTypes.PRIVATE) return 'Только я';
  return 'Публичный';
};

export const calcAndFormatSize = (item: WorkplaceItem, isFolder = false): string => {
  if (item.type === ItemTypes.FILE) {
    const { fileSize } = item as IFile;

    return formatSize(fileSize);
  }

  if (item.type === ItemTypes.TRACK) {
    const { audioSize, imageSize } = item as ITrack;

    return formatSize(audioSize + imageSize);
  }

  if (item.type === ItemTypes.FOLDER && isFolder) {
    const { folderSize } = item as IFolder;

    return formatSize(folderSize);
  }

  return '—';
};

export const getColorClassName = (item: WorkplaceItem): string => {
  if (item.type === ItemTypes.FOLDER) {
    const { color } = item as IFolder;

    return color.toLocaleLowerCase();
  }

  return '';
};

export const createChangeIsTrashMessage = (filds: IChangeIsTrashFilds): string => {
  const { items, isTrash } = filds;

  if (items.length === 1 && isTrash) {
    return `${items[0].type} в корзину`;
  }

  if (items.length === 1 && !isTrash) {
    return `${items[0].type} из корзины`;
  }

  if (isTrash) {
    return `(${items.length}) объектов перемещено в корзину`;
  }

  return `(${items.length}) объектов востановлено`;
};
