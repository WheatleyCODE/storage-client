import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { WorkplaceItem } from 'types';
import { IVideo } from 'types/video';
import './AlbumModal.scss';

export interface IAlbumModalProps {
  onClose: () => void;
  currentItems: WorkplaceItem[];
}

export const AlbumModal: FC<IAlbumModalProps> = ({ onClose, currentItems }) => {
  const item = currentItems[0] as IVideo;

  return (
    <WorkplaceModal onClose={onClose}>
      <div className="album-modal">
        <h1>Альбум</h1>
      </div>
    </WorkplaceModal>
  );
};
