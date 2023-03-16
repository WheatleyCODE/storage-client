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

export interface IVideoElement extends HTMLVideoElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

export interface IAudioStatus {
  currentTime: number;
  duration: number;
}

export interface IVideoStatus {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isRepeat: boolean;
  isMute: boolean;
  volume: number;
}
