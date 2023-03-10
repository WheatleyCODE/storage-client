import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'store';
import { ViewItemLayout, WorkplaceModal } from 'components';
import { BASE_URL } from 'consts';
import { IClientItemData } from 'types';
import './VideoModal.scss';

export interface IVideoModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();

  const openChangeModal = () => {
    onClose();
    dispatch(modalsActions.changeIsModal({ key: 'isChangeDataVideo', boolean: true }));
  };

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout isChange onClickButton={openChangeModal}>
        <div className="video-modal">
          <video controls width="500" height="300">
            <track kind="captions" />
            <source src={`${BASE_URL}/${currentItemData.getFilePath()}`} type="video/mp4" />
          </video>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
