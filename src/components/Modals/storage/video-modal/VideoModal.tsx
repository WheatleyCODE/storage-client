import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from 'store';
import { FileItemInfo, VideoPlayer, ViewItemLayout, WorkplaceModal } from 'components';
import { ItemsService } from 'services';
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
            <VideoPlayer videoData={currentItemData} />
          </div>

          <FileItemInfo itemData={currentItemData} />
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
