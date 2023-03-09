import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './ChangeAlbumDataModal.scss';

export interface IChangeAlbumDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeAlbumDataModal: FC<IChangeAlbumDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;
  const { name } = currentItemData;

  return (
    <WorkplaceModal isChange currentItemData={currentItemData} onClose={onClose}>
      <div className="change-data-album-modal">
        <h1>Функционал в разработке =(</h1>
        <h1>change-data-album-modal</h1>
        <h2>{name}</h2>
      </div>
    </WorkplaceModal>
  );
};
