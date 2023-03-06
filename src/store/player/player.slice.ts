import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayer, ITrack, RepeatType } from 'types';

const initialState: IPlayer = {
  isPlay: false,
  isOpen: false,
  isMute: false,
  repeatType: RepeatType.NONE,
  volume: 30,
  time: 0,
  playlist: [],
  currentTrack: {} as ITrack,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlaylist: (state, { payload }: PayloadAction<ITrack[]>) => {
      state.playlist = payload;
    },

    setCurrent: (state, { payload }: PayloadAction<ITrack>) => {
      state.currentTrack = payload;
    },

    changeRepeatType: (state, { payload }: PayloadAction<RepeatType>) => {
      state.repeatType = payload;
    },

    setVolume: (state, { payload }: PayloadAction<number>) => {
      state.volume = payload;
    },

    changeOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },

    changePlay: (state, { payload }: PayloadAction<boolean>) => {
      state.isPlay = payload;
    },

    changeMute: (state, { payload }: PayloadAction<boolean>) => {
      state.isMute = payload;
    },

    changeCurrentTrack: (state, { payload }: PayloadAction<ITrack>) => {
      state.currentTrack = payload;
    },
  },
});

export const playerActions = playerSlice.actions;
