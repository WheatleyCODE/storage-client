import React, { FC } from 'react';
import { WorkplaceItem } from 'types';
import './VideoModal.scss';

export interface IVideoModalProps {
  onClose: () => void;
  currentItems: WorkplaceItem[];
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose, currentItems }) => {
  const item = currentItems[0];

  return (
    <div className="video-modal">
      <h1>Video</h1>
      {item.name}
    </div>
  );
};
