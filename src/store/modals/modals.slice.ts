import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalsPayload, IModalsState } from 'types';

const initialState: IModalsState = {
  isSettings: false,
  isHotkeys: false,
  isInfo: false,
  isAside: false,
  isCreateFolder: false,
  isCreateAlbum: false,
  isCreateTrack: false,
  isCreateVideo: false,
  isDelete: false,
  isChangeAccess: false,
  isChangeParent: false,
  isGetLink: false,
  isRename: false,
  isImage: false,
  isBuySpace: false,
  isVideo: false,
  isTrack: false,
  isAlbum: false,
  isFile: false,
  isChangeDataAlbum: false,
  isChangeDataTrack: false,
  isChangeDataVideo: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,

  reducers: {
    changeIsModal: (state, { payload }: PayloadAction<IModalsPayload>) => {
      const { key, boolean } = payload;
      state[key] = boolean;
    },

    closeAllModals: (state) => {
      state.isSettings = false;
      state.isHotkeys = false;
      state.isInfo = false;
      state.isAside = false;
      state.isCreateFolder = false;
      state.isCreateAlbum = false;
      state.isCreateTrack = false;
      state.isDelete = false;
      state.isChangeAccess = false;
      state.isChangeParent = false;
      state.isGetLink = false;
      state.isRename = false;
      state.isImage = false;
      state.isBuySpace = false;
      state.isVideo = false;
      state.isTrack = false;
      state.isVideo = false;
      state.isAlbum = false;
    },
  },
});

export const modalsActions = modalsSlice.actions;
