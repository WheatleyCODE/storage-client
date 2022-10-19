import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotifierMessage, INotifierState } from 'types';

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
