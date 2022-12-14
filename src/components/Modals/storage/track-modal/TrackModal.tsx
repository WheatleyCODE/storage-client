import React, { FC } from 'react';
import { WorkplaceItem } from 'types';
import './TrackModal.scss';

export interface ITrackModalProps {
  onClose: () => void;
  currentItems: WorkplaceItem[];
}

export const TrackModal: FC<ITrackModalProps> = ({ onClose, currentItems }) => {
  const item = currentItems[0];

  return (
    <div className="track-modal">
      <h1>Track!!</h1>
      {item.name}
    </div>
  );
};
