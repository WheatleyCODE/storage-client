import React, { FC } from 'react';
import { WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './FileModal.scss';

export interface IFileModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const FileModal: FC<IFileModalProps> = ({ onClose, currentItemData }) => {
  const { name } = currentItemData;

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div className="file-modal">
        <h1>Функционал в разработке =(</h1>
        <h2>{name}</h2>
      </div>
    </WorkplaceModal>
  );
};
