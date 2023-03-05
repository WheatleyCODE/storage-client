import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './ChangeVideoDataModal.scss';

export interface IChangeVideoDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeVideoDataModal: FC<IChangeVideoDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;
  const { name } = currentItemData;

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div className="change-data-video-modal">
        <h1>Функционал в разработке =(</h1>
        <h1>change-data-video-modal</h1>
        <h2>{name}</h2>
      </div>
    </WorkplaceModal>
  );
};
