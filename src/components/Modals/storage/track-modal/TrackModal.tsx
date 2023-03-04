import React, { FC } from 'react';
import { WorkplaceModal, Button } from 'components';
import { MdPlayArrow } from 'react-icons/md';
import { PropertyFactory } from 'helpers';
import { getImageLink } from 'utils';
import { IClientItemData } from 'types';
import './TrackModal.scss';

export interface ITrackModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const TrackModal: FC<ITrackModalProps> = ({ onClose, currentItemData }) => {
  const imageLink = getImageLink(currentItemData);
  const { name, author, text } = currentItemData;

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div className="track-modal">
        <div className="track-modal__header">
          <div className="track-modal__image">
            {imageLink && <img src={imageLink} alt="Картинка трека" />}
          </div>
          <div className="track-modal__titles">
            <div className="track-modal__track__info">
              <div className="track-modal__name">{name}</div>
              <div className="track-modal__author">{author}</div>
            </div>
            <div className="track-modal__play">
              <div className="player">
                <Button color="none-light" Icon={MdPlayArrow} text="Слушать" />
              </div>
            </div>
          </div>
        </div>
        <div className="track-modal__words">{text}</div>
      </div>
    </WorkplaceModal>
  );
};
