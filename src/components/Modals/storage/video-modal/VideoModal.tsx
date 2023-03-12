import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineThumbUpAlt, MdPeopleAlt, MdStar, MdThumbUpAlt } from 'react-icons/md';
import { modalsActions } from 'store';
import { Button, ViewItemLayout, WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './VideoModal.scss';
import { getFileLink } from 'utils';

export interface IVideoModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const VideoModal: FC<IVideoModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();
  const { description, name, listenCount, likeCount, starredCount } = currentItemData;

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
          <div className="video-modal__name">{name}</div>
          <div className="video-modal__description">{description}</div>
          <div className="video-modal__view">
            <div className="video-modal__stats">
              <div className="video-modal__listen-count">
                <MdPeopleAlt />: {listenCount}
              </div>
              <div className="video-modal__like-count">
                <MdThumbUpAlt />: {likeCount}
              </div>
              <div className="video-modal__star-count">
                <MdStar />: {starredCount}
              </div>
            </div>
            <div className="video-modal__buttons">
              <Button
                className="icon-size"
                text="Нравиться"
                color="none-light"
                Icon={MdOutlineThumbUpAlt}
              />
            </div>
          </div>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
