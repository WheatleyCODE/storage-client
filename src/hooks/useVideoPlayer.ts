/* eslint-disable consistent-return */
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ItemsService } from 'services';
import { IClientItemData, IVideoElement, IVideoStatus } from 'types';

export const useVideoPlayer = (videoData: IClientItemData) => {
  const videoRef = useRef<IVideoElement>(null);

  const [status, setStatus] = useState<IVideoStatus>({
    isPlaying: false,
    currentTime: 0,
    videoTime: 0,
    progress: 0,
    isRepeat: false,
    isMute: false,
    volume: 30,
  });

  const addListen = useCallback(() => {
    const { id, type } = videoData;
    ItemsService.addListen({ id, type });
  }, [videoData]);

  useEffect(() => {
    const originalDuration = videoRef.current?.duration;
    if (originalDuration) {
      setStatus((p) => ({ ...p, videoTime: originalDuration }));
    }
  }, [videoRef.current?.duration]);

  const toggleVideo = useCallback(() => {
    if (!status.isPlaying) {
      videoRef.current?.play();
      setStatus((p) => ({ ...p, isPlaying: true }));
    } else {
      videoRef.current?.pause();
      setStatus((p) => ({ ...p, isPlaying: false }));
    }
  }, [status.isPlaying]);

  const forward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime += 15;
  }, []);

  const revert = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime -= 15;
  }, []);

  const changeCurrentTime = useCallback((time: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = time;
    setStatus((p) => ({ ...p, currentTime: time }));
  }, []);

  const toggleIsRepeat = useCallback(() => {
    setStatus((p) => ({ ...p, isRepeat: !p.isRepeat }));
  }, []);

  const toggleIsMute = useCallback(() => {
    setStatus((p) => ({ ...p, isMute: !p.isMute }));
  }, []);

  const changeVolume = useCallback((volume: number) => {
    setStatus((p) => ({ ...p, volume }));
  }, []);

  useEffect(() => {
    const { current } = videoRef;

    if (!current) return;

    current.onended = () => {
      if (status.isRepeat) {
        addListen();
        current.play();
      }
    };
  }, [addListen, status.isRepeat]);

  const fullScreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setStatus((p) => ({ ...p, currentTime: video.currentTime }));
      setStatus((p) => ({ ...p, progress: (video.currentTime / status.videoTime) * 100 }));
    };

    video.addEventListener('timeupdate', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [status.videoTime]);

  useEffect(() => {
    const { current } = videoRef;
    if (!current) return;

    current.tabIndex = -1;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          forward();
          break;
        case 'ArrowLeft':
          revert();
          break;
        case 'p':
          e.preventDefault();
          toggleVideo();
          break;
        case 'f':
          fullScreen();
          break;

        default:
      }
    };

    current.addEventListener('keydown', handleKeyDown);

    return () => {
      current.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleVideo]);

  return useMemo(
    () => ({
      videoRef,
      toggleIsMute,
      changeVolume,
      changeCurrentTime,
      toggleIsRepeat,
      revert,
      forward,
      toggleVideo,
      fullScreen,
      status,
    }),
    [changeCurrentTime, changeVolume, status, toggleIsMute, toggleIsRepeat, toggleVideo]
  );
};
