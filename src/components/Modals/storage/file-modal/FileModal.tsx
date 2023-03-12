import React, { FC } from 'react';
import { SiVisualstudiocode } from 'react-icons/si';
import { ViewItemLayout, WorkplaceModal } from 'components';
import { formatSize } from 'utils';
import { IClientItemData } from 'types';
import './FileModal.scss';

export interface IFileModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const FileModal: FC<IFileModalProps> = ({ onClose, currentItemData }) => {
  const { name, fileExt } = currentItemData;

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout>
        <div className="file-modal">
          <div className="file-modal__name">Название: {name}</div>
          <div className="file-modal__ext">Разширение: .{fileExt}</div>
          <div className="file-modal__ext">Размер: {formatSize(currentItemData.getSize())}</div>
          <div className="file-modal__alert">
            <SiVisualstudiocode className="icon" /> Функционал в разработке...
          </div>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
