import React, { FC } from 'react';
import { Button, WorkplaceModal } from 'components';
import { BASE_URL } from 'consts';
import { IClientItemData } from 'types';
import './VideoModal.scss';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'store';

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
      <div className="video-modal">
        <div className="video-modal__open-change-modal">
          <Button
            onClick={openChangeModal}
            outline="fill"
            color="none-light"
            type="icon"
            Icon={MdOutlineEdit}
          />
        </div>
        <video controls width="500" height="400">
          <track kind="captions" />
          <source src={`${BASE_URL}/${currentItemData.getFilePath()}`} type="video/mp4" />
        </video>
      </div>
    </WorkplaceModal>
  );
};
