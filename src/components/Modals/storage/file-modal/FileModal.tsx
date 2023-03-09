import React, { FC } from 'react';
import { ViewItemLayout, WorkplaceModal } from 'components';
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
      <ViewItemLayout>
        <div className="file-modal">
          <h1>{name}</h1>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
