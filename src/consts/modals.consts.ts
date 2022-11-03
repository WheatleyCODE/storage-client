import { HashModals, HashModalsToStateKeys, StateKeysToHashModals } from 'types';

export const hashToStateKeys: HashModalsToStateKeys = {
  [HashModals.CREATE_FOLDER]: 'isCreateFolder',
  [HashModals.CREATE_ALBUM]: 'isCreateAlbum',
  [HashModals.CREATE_TRACK]: 'isCreateTrack',
  [HashModals.UPLOAD_FILES]: 'isUploadFiles',
  [HashModals.SETTINGS]: 'isSettings',
  [HashModals.HOTKEYS]: 'isHotkeys',
  [HashModals.DELETE]: 'isDelete',
};

export const stateKeysToHashModals: StateKeysToHashModals = {
  isCreateFolder: HashModals.CREATE_FOLDER,
  isCreateAlbum: HashModals.CREATE_ALBUM,
  isCreateTrack: HashModals.CREATE_TRACK,
  isUploadFiles: HashModals.UPLOAD_FILES,
  isSettings: HashModals.SETTINGS,
  isHotkeys: HashModals.HOTKEYS,
  isDelete: HashModals.DELETE,
};
