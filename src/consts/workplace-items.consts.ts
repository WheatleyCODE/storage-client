import { storageWorkplaceAccessIcons } from 'consts';
import { transformAccess } from 'utils';
import { AccessTypes } from 'types';

export const createTrackStepTitles = [
  { title: 'Название и автор' },
  { title: 'Текст трека' },
  { title: 'Загрузка файлов' },
];

export const createAlbumStepTitles = [
  { title: 'Название и автор' },
  { title: 'Загрузка картинки' },
];

export const createVideoStepTitles = [
  { title: 'Название видео' },
  { title: 'Описание' },
  { title: 'Загрузка файлов' },
];

export const changeAccessItems = [
  {
    text: transformAccess(AccessTypes.PRIVATE),
    Icon: storageWorkplaceAccessIcons[AccessTypes.PRIVATE],
    value: AccessTypes.PRIVATE,
  },
  {
    text: transformAccess(AccessTypes.LINK),
    Icon: storageWorkplaceAccessIcons[AccessTypes.LINK],
    value: AccessTypes.LINK,
  },
  {
    text: transformAccess(AccessTypes.PUBLIC),
    Icon: storageWorkplaceAccessIcons[AccessTypes.PUBLIC],
    value: AccessTypes.PUBLIC,
  },
];
