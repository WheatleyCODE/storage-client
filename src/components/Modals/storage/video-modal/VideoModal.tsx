import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'store';
import { FileItemInfo, ViewItemLayout, WorkplaceModal } from 'components';
import { ItemsService } from 'services';
import { getFileLink } from 'utils';
import { IClientItemData } from 'types';
import './VideoModal.scss';

export interface IVideoModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    ItemsService.addListen({ id: currentItemData.id, type: currentItemData.type });
  }, []);

  const openChangeModal = () => {
    onClose();
    dispatch(modalsActions.changeIsModal({ key: 'isChangeDataVideo', boolean: true }));
  };

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout isChange onClickButton={openChangeModal}>
        <div className="video-modal">
          <div className="video-modal__video">
            <video controls width="500" height="300">
              <track kind="captions" />
              <source src={getFileLink(currentItemData) || ''} type="video/mp4" />
            </video>
          </div>

          <FileItemInfo itemData={currentItemData} />
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
