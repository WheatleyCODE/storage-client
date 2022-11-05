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
  isUploadFiles: false,
  isDelete: false,
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
      state.isCreateFolder = false;
    },
  },
});

export const modalsActions = modalsSlice.actions;
