import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './ChangeTrackDataModal.scss';

export interface IChangeTrackDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeTrackDataModal: FC<IChangeTrackDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;
  const { name } = currentItemData;

  return (
    <WorkplaceModal isChange currentItemData={currentItemData} onClose={onClose}>
      <div className="change-data-track-modal">
        <h1>Функционал в разработке =(</h1>
        <h1>change-data-track-modal</h1>
        <h2>{name}</h2>
      </div>
    </WorkplaceModal>
  );
};
