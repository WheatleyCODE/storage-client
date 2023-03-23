import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAddMessageAndPrevItems,
  IRestoreAlertMessage,
  IRestoreState,
  IServerItemData,
} from 'types';

const initialState: IRestoreState = {
  currentMessages: [],
  restoreMessages: [],
  restoreItems: [],
};

export const restoreSlice = createSlice({
  name: 'restore',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<IRestoreState>) => {
      const { restoreMessages, restoreItems, currentMessages } = action.payload;

      state.restoreMessages = restoreMessages;
      state.restoreItems = restoreItems;
      state.currentMessages = currentMessages;
    },

    addCurrentMessage: (state, action: PayloadAction<IRestoreAlertMessage>) => {
      const restoreMessage = { ...action.payload, clientId: Date.now() };

      state.currentMessages.push(restoreMessage);
    },

    deleteCurrentMessage: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.currentMessages = state.currentMessages.filter((message) => message.clientId !== id);
    },

    addMessageAndPrevItem: (state, action: PayloadAction<IAddMessageAndPrevItems>) => {
      const { message, items } = action.payload;
      const clientId = Date.now();

      const restoreMessage = { ...message, clientId };
      const restoreItem = { clientId, items };

      state.currentMessages.push(restoreMessage);
      state.restoreMessages.push(restoreMessage);
      state.restoreItems.push(restoreItem);
    },

    deleteMessageAndPrevItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.restoreItems = [...state.restoreItems].filter((item) => id !== item.clientId);
      state.currentMessages = [...state.currentMessages].filter((item) => id !== item.clientId);
      state.restoreMessages = state.restoreMessages.filter((message) => message.clientId !== id);
    },
  },
});

export const restoreActions = restoreSlice.actions;
