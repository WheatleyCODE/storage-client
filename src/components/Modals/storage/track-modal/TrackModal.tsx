import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions, playerActions } from 'store';
import { WorkplaceModal, ViewItemLayout, MusicItemInfo } from 'components';
import { IClientItemData, ITrack } from 'types';
import './TrackModal.scss';

export interface ITrackModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const TrackModal: FC<ITrackModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();

  const playTrack = () => {
    dispatch(playerActions.setCurrent(currentItemData.toServerItemData() as ITrack));
    dispatch(playerActions.changeOpen(true));
    dispatch(playerActions.changePlay(true));
  };

  const openChangeModal = () => {
    onClose();
    dispatch(modalsActions.changeIsModal({ key: 'isChangeDataTrack', boolean: true }));
  };

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout onClick={openChangeModal} isChange>
        <div className="track-modal">
          <MusicItemInfo itemData={currentItemData} typeName="Альбом" onPlayHandler={playTrack}>
            <div className="track-modal__words">Текст великий</div>
          </MusicItemInfo>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
