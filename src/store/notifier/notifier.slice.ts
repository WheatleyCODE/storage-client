import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotifierMessage } from 'types';
import { INotifierState } from './notifier.interface';

const initialState: INotifierState = {
  currentMessages: [],
};

export const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    notifierAddMessage: (state, action: PayloadAction<INotifierMessage>) => {
      state.currentMessages.push(action.payload);
    },

    notifierRemoveMessage: (state, action: PayloadAction<number>) => {
      state.currentMessages = state.currentMessages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});
