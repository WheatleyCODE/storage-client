import { HashModals, HashModalsToStateKeys, StateKeysToHashModals } from 'types';

export const hashToStateKeys: HashModalsToStateKeys = {
  [HashModals.CREATE_FOLDER]: 'isCreateFolder',
  [HashModals.CREATE_ALBUM]: 'isCreateAlbum',
  [HashModals.CREATE_TRACK]: 'isCreateTrack',
  [HashModals.SETTINGS]: 'isSettings',
  [HashModals.HOTKEYS]: 'isHotkeys',
  [HashModals.DELETE]: 'isDelete',
  [HashModals.INFO]: 'isInfo',
  [HashModals.ASIDE]: 'isAside',
  [HashModals.CHANGE_ACCESS]: 'isChangeAccess',
  [HashModals.CHANGE_PARENT]: 'isChangeParent',
  [HashModals.GET_LINK]: 'isGetLink',
  [HashModals.RENAME]: 'isRename',
  [HashModals.IMAGE]: 'isImage',
  [HashModals.BUY_SPACE]: 'isBuySpace',
};

export const stateKeysToHashModals: StateKeysToHashModals = {
  isCreateFolder: HashModals.CREATE_FOLDER,
  isCreateAlbum: HashModals.CREATE_ALBUM,
  isCreateTrack: HashModals.CREATE_TRACK,
  isSettings: HashModals.SETTINGS,
  isHotkeys: HashModals.HOTKEYS,
  isDelete: HashModals.DELETE,
  isInfo: HashModals.INFO,
  isAside: HashModals.ASIDE,
  isChangeAccess: HashModals.CHANGE_ACCESS,
  isChangeParent: HashModals.CHANGE_PARENT,
  isGetLink: HashModals.GET_LINK,
  isRename: HashModals.RENAME,
  isImage: HashModals.IMAGE,
  isBuySpace: HashModals.BUY_SPACE,
};
