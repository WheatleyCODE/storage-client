import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { playerActions } from 'store';
import { IClientItemData, ItemTypes, ITrack } from 'types';

export const useAudioPlayerHandlers = () => {
  const dispatch = useDispatch();

  const setTrack = useCallback((itemData: IClientItemData, tracks: ITrack[]) => {
    const dispatchTrack = (track: ITrack, trackList: ITrack[]) => {
      dispatch(playerActions.setCurrent(track));
      dispatch(playerActions.setPlaylist(trackList));
      dispatch(playerActions.changeOpen(true));
      dispatch(playerActions.changePlay(true));
    };

    if (itemData.type === ItemTypes.TRACK) {
      dispatchTrack(itemData.toServerItemData() as ITrack, tracks);
      return;
    }

    if (itemData.type === ItemTypes.ALBUM) {
      const albumTracks = itemData.tracks || [];
      const firstTrack = albumTracks[0];

      if (firstTrack) dispatchTrack(firstTrack, albumTracks);
    }
  }, []);

  return { setTrack };
};
