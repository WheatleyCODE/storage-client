import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  any: [],
};

export const commentSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
});

export const notifierActions = commentSlice.actions;
