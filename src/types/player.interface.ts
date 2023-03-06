import { ITrack } from './track.interface';

export enum RepeatType {
  NONE = 'NONE',
  TRACK = 'TRACK',
  ALBUM = 'ALBUM',
}

export interface IPlayer {
  isPlay: boolean;
  isOpen: boolean;
  isMute: boolean;
  repeatType: RepeatType;
  volume: number;
  time: number;
  playlist: ITrack[];
  currentTrack: ITrack;
}
