import { IconType } from 'react-icons';
import { IFile } from 'types/file.interface';
import { ITrack } from 'types/track.interface';
import { BASE_URL, storageWorkplaceIcons } from 'consts';
import { formatSize } from 'utils';
import { AccessTypes, ItemTypes, WorkplaceItem, IChangeIsTrashFilds, IFolder, IAlbum } from 'types';
import { IImage } from 'types/image.interface';
import { IVideo } from 'types/video';

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

    return formatSize(audioSize + (imageSize || 0));
  }

  if (item.type === ItemTypes.VIDEO) {
    const { videoSize, imageSize } = item as IVideo;

    return formatSize(videoSize + (imageSize || 0));
  }

  if (item.type === ItemTypes.FOLDER && isFolder) {
    const { folderSize } = item as IFolder;

    return formatSize(folderSize);
  }

  if (item.type === ItemTypes.IMAGE) {
    const { imageSize } = item as IImage;

    return formatSize(imageSize);
  }

  return '—';
};

export const getSize = (item: WorkplaceItem, isFolder = false): number => {
  if (item.type === ItemTypes.FILE) {
    const { fileSize } = item as IFile;

    return fileSize;
  }

  if (item.type === ItemTypes.TRACK) {
    const { audioSize, imageSize } = item as ITrack;

    return audioSize + (imageSize || 0);
  }

  if (item.type === ItemTypes.VIDEO) {
    const { videoSize, imageSize } = item as IVideo;

    return videoSize + (imageSize || 0);
  }

  if (item.type === ItemTypes.FOLDER && isFolder) {
    const { folderSize } = item as IFolder;

    return folderSize;
  }

  if (item.type === ItemTypes.IMAGE) {
    const { imageSize } = item as IImage;

    return imageSize;
  }

  return 0;
};

export const getColorClassName = (item: WorkplaceItem): string => {
  if (item.type === ItemTypes.FOLDER) {
    const { color } = item as IFolder;

    return color.toLocaleLowerCase();
  }

  return '';
};

export const getImageLink = (item: WorkplaceItem): string | false => {
  if (item.type === ItemTypes.TRACK || item.type === ItemTypes.VIDEO) {
    const { image } = item as ITrack | IVideo;

    if (!image) return false;

    return `${BASE_URL}/${image}`;
  }

  if (item.type === ItemTypes.ALBUM || item.type === ItemTypes.IMAGE) {
    const { image } = item as IAlbum | IImage;

    return `${BASE_URL}/${image}`;
  }

  return false;
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

export const getWorkplaceIcon = (item: WorkplaceItem): IconType => {
  const { accessType, type } = item;

  const isAccess = accessType === AccessTypes.LINK || accessType === AccessTypes.PUBLIC;

  if (isAccess && type === ItemTypes.FOLDER) {
    return storageWorkplaceIcons.FOLDER_SHARED;
  }

  return storageWorkplaceIcons[type];
};
