import React, { FC } from 'react';
import './TrackModal.scss';

export interface ITrackModalProps {
  onClose: () => void;
}

export const TrackModal: FC<ITrackModalProps> = ({ onClose }) => {
  return (
    <div className="track-modal">
      <h1>Track!!</h1>
    </div>
  );
};
