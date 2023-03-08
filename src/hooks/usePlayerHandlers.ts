import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'hooks';
import { playerActions } from 'store';
import { IClientItemData, ItemTypes, ITrack, RepeatType } from 'types';
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

  const playTrack = useCallback((itemData: IClientItemData, tracks: ITrack[]) => {
    if (itemData.type === ItemTypes.TRACK) {
      dispatch(playerActions.setCurrent(itemData.toServerItemData() as ITrack));
      dispatch(playerActions.setPlaylist(tracks));
      dispatch(playerActions.changeOpen(true));
      dispatch(playerActions.changePlay(true));
      return;
    }

    if (itemData.type === ItemTypes.ALBUM) {
      const albumTracks = itemData.tracks;

      if (!albumTracks) return;
      if (!albumTracks[0]) return;

      dispatch(playerActions.setCurrent(albumTracks[0]));
      dispatch(playerActions.setPlaylist(albumTracks));
      dispatch(playerActions.changeOpen(true));
      dispatch(playerActions.changePlay(true));
    }
  }, []);

  return { nextTrack, prevTrack, changeRepeatType, playTrack };
};
