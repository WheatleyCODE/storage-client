import React, { FC } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { WorkplaceModal, Button } from 'components';
import { getImageLink } from 'utils';
import { IClientItemData } from 'types';
import './AlbumModal.scss';

export interface IAlbumModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const AlbumModal: FC<IAlbumModalProps> = ({ onClose, currentItemData }) => {
  const imageLink = getImageLink(currentItemData);
  const { name, author } = currentItemData;

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div className="album-modal">
        <div className="album-modal__header">
          <div className="album-modal__image">
            {imageLink && <img src={imageLink} alt="Картинка трека" />}
          </div>
          <div className="album-modal__titles">
            <div className="album-modal__track__info">
              <div className="album-modal__name">{name}</div>
              <div className="album-modal__author">{author}</div>
            </div>
            <div className="album-modal__play">
              <div className="player">
                <Button Icon={MdPlayArrow} text="Слушать" />
              </div>
            </div>
          </div>
        </div>
        <div className="album-modal__tracks">
          <div className="album-modal__track">1</div>
          <div className="album-modal__track">2</div>
          <div className="album-modal__track">3</div>
        </div>
      </div>
    </WorkplaceModal>
  );
};
