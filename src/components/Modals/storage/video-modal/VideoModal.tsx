import React, { FC } from 'react';
import './VideoModal.scss';

export interface IVideoModalProps {
  onClose: () => void;
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose }) => {
  return (
    <div className="video-modal">
      <h1>Video</h1>
    </div>
  );
};
