import React, { FC, useEffect } from 'react';
import { SiVisualstudiocode } from 'react-icons/si';
import { FileItemInfo, ViewItemLayout, WorkplaceModal } from 'components';
import { ItemsService } from 'services';
import { IClientItemData } from 'types';
import './FileModal.scss';

export interface IFileModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const FileModal: FC<IFileModalProps> = ({ onClose, currentItemData }) => {
  useEffect(() => {
    ItemsService.addListen({ id: currentItemData.id, type: currentItemData.type });
  }, []);

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout>
        <div className="file-modal">
          <FileItemInfo itemData={currentItemData} />
          <div className="file-modal__alert">
            <SiVisualstudiocode className="icon" /> Функционал в разработке...
          </div>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
