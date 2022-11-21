export interface IModalsState {
  isSettings: boolean;
  isHotkeys: boolean;
  isInfo: boolean;
  isAside: boolean;
  isCreateFolder: boolean;
  isCreateAlbum: boolean;
  isCreateTrack: boolean;
  isDelete: boolean;
  isChangeAccess: boolean;
  isChangeParent: boolean;
  isGetLink: boolean;
  isRename: boolean;
  isImage: boolean;
  isBuySpace: boolean;
}

export type ModalsStateKeys = keyof IModalsState;

export interface IModalsPayload {
  key: ModalsStateKeys;
  boolean: boolean;
}

export enum HashModals {
  CREATE_FOLDER = '#create-folder',
  CREATE_ALBUM = '#create-album',
  CREATE_TRACK = '#create-track',
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
}

export type HashModalsToStateKeys = {
  [key in HashModals as string]: ModalsStateKeys;
};

export type StateKeysToHashModals = {
  [key in ModalsStateKeys]: HashModals;
};
