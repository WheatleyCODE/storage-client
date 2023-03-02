import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  any: [],
};

export const imageSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
});

export const notifierActions = imageSlice.actions;
