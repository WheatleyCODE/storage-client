export interface IModalsState {
  isSettings: boolean;
  isHotkeys: boolean;
  isCreateFolder: boolean;
  isCreateAlbum: boolean;
  isCreateTrack: boolean;
  isUploadFiles: boolean;
  isDelete: boolean;
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
  DELETE = '#delete',
}

export type HashModalsToStateKeys = {
  [key in HashModals as string]: ModalsStateKeys;
};

export type StateKeysToHashModals = {
  [key in ModalsStateKeys]: HashModals;
};
