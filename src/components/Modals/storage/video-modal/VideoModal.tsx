import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { BASE_URL } from 'consts';
import { IClientItemData } from 'types';
import './VideoModal.scss';

export interface IVideoModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose, currentItemData }) => {
  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div className="video-modal">
        <video controls width="500" height="400">
          <track kind="captions" />
          <source src={`${BASE_URL}/${currentItemData.getFilePath()}`} type="video/mp4" />
        </video>
      </div>
    </WorkplaceModal>
  );
};
