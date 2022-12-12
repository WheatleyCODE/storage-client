import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUploaderState } from 'types';

const initialState: IUploaderState = {
  isOpen: false,
  progress: null,
  fileNames: [],
  isUpload: false,
};

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    setIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload;
    },

    setProgress(state, { payload }: PayloadAction<number>) {
      state.progress = payload;
    },

    setFileNames(state, { payload }: PayloadAction<string[]>) {
      state.fileNames = [...payload];
    },

    setIsUpload(state, { payload }: PayloadAction<boolean>) {
      state.isUpload = payload;
    },
  },
});

export const uploaderActions = uploaderSlice.actions;
