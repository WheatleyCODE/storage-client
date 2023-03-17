/* eslint-disable consistent-return */
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ItemsService } from 'services';
import { useTypedSelector } from 'hooks';
import { playerActions } from 'store';
import { PropertyFactory } from 'helpers';
import { correctVolume, getFileLink } from 'utils';
import { repeatSteps } from 'consts';
import { IAudioStatus, RepeatType } from 'types';
import { useAudioPlayerHandlers } from './useAudioPlayerHandlers';

export const useAudioPlayer = (audio: HTMLAudioElement) => {
  const mainDivRef = useRef<HTMLDivElement | null>(null);
  const { setTrack } = useAudioPlayerHandlers();

  const { playlist, currentTrack, repeatType, isMute, isPlay, volume } = useTypedSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();

  const [status, setStatus] = useState<IAudioStatus>({
    currentTime: 0,
    duration: 0,
  });

  const currentTrackData = PropertyFactory.create(currentTrack);

  const addListen = useCallback(() => {
    const { id, type } = currentTrack;
    ItemsService.addListen({ id, type });
  }, [currentTrack]);

  useEffect(() => {
    audio.onended = () => {
      if (repeatType === RepeatType.NONE) {
        dispatch(playerActions.changePlay(false));
        return;
      }

      if (repeatType === RepeatType.TRACK || !playlist.length) {
        audio.play();
        addListen();
        return;
      }

      const index = playlist.findIndex((track) => track.id === currentTrack.id);

      if (playlist.length > 1 && playlist[index + 1]) {
        const track = playlist[index + 1];
        dispatch(playerActions.setCurrent(track));
      }
    };
  }, [repeatType, playlist, currentTrack, addListen]);

  useEffect(() => {
    const { current } = mainDivRef;
    if (current) current.focus();

    const path = getFileLink(currentTrackData);
    if (!path) return;

    addListen();

    audio.src = path;
    audio.volume = correctVolume(volume);
    audio.onloadedmetadata = () => {
      setStatus((p) => ({ ...p, duration: audio.duration }));
    };

    audio.ontimeupdate = () => {
      setStatus((p) => ({ ...p, currentTime: audio.currentTime }));
    };

    if (isPlay) audio.play();
  }, [addListen, currentTrack]);

  const toggleIsPlay = useCallback(() => {
    if (!isPlay) {
      audio.play();
    } else {
      audio.pause();
    }

    dispatch(playerActions.changePlay(!isPlay));
  }, [isPlay]);

  const nextTrack = useCallback(() => {
    const index = playlist.findIndex((track) => track.id === currentTrack.id);
    const nextAudio = playlist[index + 1];

    if (nextAudio) {
      dispatch(playerActions.setCurrent(nextAudio));
    }

    if (repeatType === RepeatType.TRACK) {
      dispatch(playerActions.changeRepeatType(RepeatType.NONE));
    }
  }, [currentTrack.id, playlist, repeatType]);

  const prevTrack = useCallback(() => {
    const index = playlist.findIndex((track) => track.id === currentTrack.id);
    const prevAudio = playlist[index - 1];

    if (prevAudio) {
      dispatch(playerActions.setCurrent(prevAudio));
    }

    if (repeatType === RepeatType.TRACK) {
      dispatch(playerActions.changeRepeatType(RepeatType.NONE));
    }
  }, [currentTrack.id, playlist, repeatType]);

  const changeCurrentTime = useCallback((time: number) => {
    audio.currentTime = time;
    setStatus((p) => ({ ...p, currentTime: time }));
  }, []);

  const changeRepeatType = useCallback(() => {
    const index = repeatSteps.findIndex((type) => type === repeatType);
    const type = repeatSteps[index + 1];

    if (type) {
      dispatch(playerActions.changeRepeatType(type));
      return;
    }

    dispatch(playerActions.changeRepeatType(repeatSteps[0]));
  }, [repeatType]);

  const toggleIsMute = useCallback(() => {
    if (!isMute) {
      audio.volume = 0;
    } else {
      audio.volume = correctVolume(volume);
    }

    dispatch(playerActions.changeMute(!isMute));
  }, [isMute, volume]);

  const closeAudioPlayer = useCallback(() => {
    dispatch(playerActions.changeOpen(false));
    dispatch(playerActions.changePlay(false));
    audio.pause();
  }, []);

  const changeVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number(e.target.value);

      if (isMute && newVolume !== 0) {
        dispatch(playerActions.changeMute(false));
      }

      if (newVolume === 0) {
        dispatch(playerActions.changeMute(true));
      }

      audio.volume = correctVolume(newVolume);
      dispatch(playerActions.setVolume(newVolume));
    },
    [isMute]
  );

  useEffect(() => {
    const { current } = mainDivRef;
    if (!current) return;
    current.tabIndex = -1;

    current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          nextTrack();
          break;
        case 'ArrowLeft':
          prevTrack();
          break;
        case 'p':
          e.preventDefault();
          toggleIsPlay();
          break;
        case 'r':
          e.preventDefault();
          changeRepeatType();
          break;
        case 'm':
          e.preventDefault();
          toggleIsMute();
          break;
        case 'Escape':
          e.preventDefault();
          closeAudioPlayer();
          break;

        default:
      }
    };

    current.addEventListener('keydown', handleKeyDown);

    return () => {
      current.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeRepeatType, closeAudioPlayer, nextTrack, prevTrack, toggleIsMute, toggleIsPlay]);

  return useMemo(
    () => ({
      playlist,
      currentTrack,
      repeatType,
      isMute,
      isPlay,
      volume,
      mainDivRef,
      currentTrackData,
      closeAudioPlayer,
      toggleIsMute,
      setTrack,
      changeVolume,
      changeCurrentTime,
      changeRepeatType,
      nextTrack,
      prevTrack,
      toggleIsPlay,
      status,
    }),
    [
      playlist,
      currentTrack,
      repeatType,
      isMute,
      isPlay,
      volume,
      currentTrackData,
      closeAudioPlayer,
      toggleIsMute,
      setTrack,
      changeVolume,
      changeCurrentTime,
      changeRepeatType,
      nextTrack,
      prevTrack,
      toggleIsPlay,
      status,
    ]
  );
};
