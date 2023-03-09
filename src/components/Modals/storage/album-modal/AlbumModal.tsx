import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'store';
import { WorkplaceModal, StorageItem, ViewItemLayout, MusicItemInfo } from 'components';
import { usePlayerHandlers } from 'hooks';
import { PropertyFactory } from 'helpers';
import { IClientItemData } from 'types';
import './AlbumModal.scss';

export interface IAlbumModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const AlbumModal: FC<IAlbumModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();
  const { playTrack } = usePlayerHandlers();

  const albumTracks = currentItemData.tracks;

  if (!albumTracks) {
    onClose();
    return <div />;
  }

  const tracksData = albumTracks.map((track) => PropertyFactory.create(track));
  const isNoTracks = !!tracksData.length;

  const openChangeModal = () => {
    onClose();
    dispatch(modalsActions.changeIsModal({ key: 'isChangeDataAlbum', boolean: true }));
  };

  const playAlbum = () => {
    playTrack(currentItemData, currentItemData.tracks || []);
  };

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout onClick={openChangeModal} isChange>
        <div className="album-modal">
          <MusicItemInfo itemData={currentItemData} typeName="Альбом" onPlayHandler={playAlbum}>
            <div className="album-modal__tracks">
              {!isNoTracks && <div>Треков нет</div>}
              {tracksData.map((track) => (
                <StorageItem isShowSize key={track.id} isDark isPlay itemData={track} />
              ))}
            </div>
          </MusicItemInfo>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
