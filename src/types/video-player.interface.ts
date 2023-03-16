export interface IVideoElement extends HTMLVideoElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

export interface IVideoStatus {
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  videoTime: number;
  isRepeat: boolean;
  isMute: boolean;
  volume: number;
}
