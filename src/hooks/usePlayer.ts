import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks';
import { playerActions } from 'store';
import { RepeatType } from 'types';
import { repeatSteps } from 'consts';

export const usePlayerHandlers = () => {
  const { playlist, currentTrack, repeatType } = useTypedSelector((state) => state.player);
  const dispatch = useDispatch();

  const nextTrack = useCallback(() => {
    const index = playlist.findIndex((track) => track.id === currentTrack.id);

    if (playlist[index + 1]) {
      const track = playlist[index + 1];
      dispatch(playerActions.setCurrent(track));
    }

    if (repeatType === RepeatType.TRACK) {
      dispatch(playerActions.changeRepeatType(RepeatType.NONE));
    }
  }, [currentTrack, playlist]);

  const prevTrack = useCallback(() => {
    const index = playlist.findIndex((track) => track.id === currentTrack.id);

    if (playlist[index - 1]) {
      const track = playlist[index - 1];
      dispatch(playerActions.setCurrent(track));
    }

    if (repeatType === RepeatType.TRACK) {
      dispatch(playerActions.changeRepeatType(RepeatType.NONE));
    }
  }, [currentTrack, playlist, repeatType]);

  const changeRepeatType = useCallback(() => {
    const index = repeatSteps.findIndex((type) => type === repeatType);
    const type = repeatSteps[index + 1];

    if (type) {
      dispatch(playerActions.changeRepeatType(type));
      return;
    }

    dispatch(playerActions.changeRepeatType(repeatSteps[0]));
  }, [repeatType]);

  return { nextTrack, prevTrack, changeRepeatType };
};
