import { ItemTypes } from './storage-workplace.intarface';

export interface IModalsState {
  isSettings: boolean;
  isHotkeys: boolean;
  isInfo: boolean;
  isAside: boolean;
  isCreateFolder: boolean;
  isCreateAlbum: boolean;
  isCreateTrack: boolean;
  isCreateVideo: boolean;
  isDelete: boolean;
  isChangeAccess: boolean;
  isChangeParent: boolean;
  isGetLink: boolean;
  isRename: boolean;
  isImage: boolean;
  isBuySpace: boolean;
  isVideo: boolean;
  isTrack: boolean;
  isAlbum: boolean;
}

export type ModalsStateKeys = keyof IModalsState;

export const openModalKeys: { [key in ItemTypes as string]: ModalsStateKeys } = {
  [ItemTypes.ALBUM]: 'isAlbum',
  [ItemTypes.IMAGE]: 'isImage',
  [ItemTypes.TRACK]: 'isTrack',
  [ItemTypes.VIDEO]: 'isVideo',
};

export interface IModalsPayload {
  key: ModalsStateKeys;
  boolean: boolean;
}

export enum HashModals {
  CREATE_FOLDER = '#create-folder',
  CREATE_ALBUM = '#create-album',
  CREATE_TRACK = '#create-track',
  CREATE_VIDEO = '#create-video',
  UPLOAD_FILES = '#upload-files',
  SETTINGS = '#settings',
  HOTKEYS = '#hotkeys',
  INFO = '#info',
  ASIDE = '#aside',
  DELETE = '#delete',
  CHANGE_ACCESS = '#change-access',
  CHANGE_PARENT = '#change-parent',
  GET_LINK = '#get-link',
  RENAME = '#rename',
  IMAGE = '#image',
  BUY_SPACE = '#buy-space',
  VIDEO = '#video',
  TRACK = '#track',
  ALBUM = '#album',
}

export type HashModalsToStateKeys = {
  [key in HashModals as string]: ModalsStateKeys;
};

export type StateKeysToHashModals = {
  [key in ModalsStateKeys]: HashModals;
};
