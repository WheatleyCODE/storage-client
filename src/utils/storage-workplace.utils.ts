import { AccessTypes, ItemTypes, WorkplaceItem, IChangeIsTrashFilds } from 'types';
import { IFile } from 'types/file.interface';
import { ITrack } from 'types/track.interface';
import { formatSize } from './storage.utils';

export const transformDate = (date: number): string => new Date(date).toLocaleDateString();

export const transformAccess = (type: AccessTypes): string => {
  if (type === AccessTypes.LINK) return 'По cсылке';
  if (type === AccessTypes.PRIVATE) return 'Только я';
  return 'Публичный';
};

export const calcAndFormatSize = (item: WorkplaceItem): string => {
  if (item.type === ItemTypes.FILE) {
    const { fileSize } = item as IFile;

    return formatSize(fileSize);
  }

  if (item.type === ItemTypes.TRACK) {
    const { audioSize, imageSize } = item as ITrack;

    return formatSize(audioSize + imageSize);
  }

  return '—';
};

export const createChangeIsTrashMessage = (filds: IChangeIsTrashFilds): string => {
  const { items, isTrash } = filds;

  if (items.length === 1) {
    return isTrash ? `${items[0].type} перемещена в корзину` : `${items[0].type} востановлена`;
  }

  return isTrash
    ? `(${items.length}) объектов перемещено в корзину`
    : `(${items.length}) объектов востановлено`;
};
