import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'store';
import { WorkplaceModal, StorageItem, ViewItemLayout, MusicItemInfo } from 'components';
import { ItemsService } from 'services';
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

  useEffect(() => {
    ItemsService.addListen({ id: currentItemData.id, type: currentItemData.type });
  }, []);

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
      <ViewItemLayout onClickButton={openChangeModal} isChange>
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
