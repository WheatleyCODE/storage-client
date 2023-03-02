import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { BASE_URL } from 'consts';
import { WorkplaceItem } from 'types';
import { IVideo } from 'types/video.interface';
import './VideoModal.scss';
import { PropertyFactory } from 'helpers';

export interface IVideoModalProps {
  onClose: () => void;
  currentItems: WorkplaceItem[];
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose, currentItems }) => {
  const item = currentItems[0] as IVideo;
  const ItemData = PropertyFactory.create(item);

  return (
    <WorkplaceModal currentItems={currentItems} onClose={onClose}>
      <div className="video-modal">
        <video controls width="400" height="300">
          <track kind="captions" />
          <source src={`${BASE_URL}/${ItemData.getFilePath}`} type="video/mp4" />
        </video>
      </div>
    </WorkplaceModal>
  );
};
