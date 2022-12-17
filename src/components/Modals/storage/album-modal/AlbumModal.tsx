import React, { FC } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { WorkplaceModal, Button } from 'components';
import { IAlbum, WorkplaceItem } from 'types';
import { getImageLink } from 'utils';
import './AlbumModal.scss';

export interface IAlbumModalProps {
  onClose: () => void;
  currentItems: WorkplaceItem[];
}

export const AlbumModal: FC<IAlbumModalProps> = ({ onClose, currentItems }) => {
  const item = currentItems[0] as IAlbum;

  const imageLink = getImageLink(item);

  return (
    <WorkplaceModal currentItems={currentItems} onClose={onClose}>
      <div className="album-modal">
        <div className="album-modal__header">
          <div className="album-modal__image">
            {imageLink && <img src={imageLink} alt="Картинка трека" />}
          </div>
          <div className="album-modal__titles">
            <div className="album-modal__track__info">
              <div className="album-modal__name">{item.name}</div>
              <div className="album-modal__author">{item.author}</div>
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
