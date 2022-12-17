import React, { FC } from 'react';
import { WorkplaceModal, Button } from 'components';
import { MdPlayArrow } from 'react-icons/md';
import { ITrack, WorkplaceItem } from 'types';
import { getImageLink } from 'utils';
import './TrackModal.scss';

export interface ITrackModalProps {
  onClose: () => void;
  currentItems: WorkplaceItem[];
}

export const TrackModal: FC<ITrackModalProps> = ({ onClose, currentItems }) => {
  const item = currentItems[0] as ITrack;

  const imageLink = getImageLink(item);

  return (
    <WorkplaceModal currentItems={currentItems} onClose={onClose}>
      <div className="track-modal">
        <div className="track-modal__header">
          <div className="track-modal__image">
            {imageLink && <img src={imageLink} alt="Картинка трека" />}
          </div>
          <div className="track-modal__titles">
            <div className="track-modal__track__info">
              <div className="track-modal__name">{item.name}</div>
              <div className="track-modal__author">{item.author}</div>
            </div>
            <div className="track-modal__play">
              <div className="player">
                <Button color="none-light" Icon={MdPlayArrow} text="Слушать" />
              </div>
            </div>
          </div>
        </div>
        <div className="track-modal__words">{item.text}</div>
      </div>
    </WorkplaceModal>
  );
};
