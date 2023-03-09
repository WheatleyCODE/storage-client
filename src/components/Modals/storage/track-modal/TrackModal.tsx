import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  MdOutlineEdit,
  MdOutlineThumbUpAlt,
  MdPeopleAlt,
  MdPlayArrow,
  MdStar,
  MdThumbUpAlt,
} from 'react-icons/md';
import { modalsActions, playerActions } from 'store';
import { WorkplaceModal, Button, Image } from 'components';
import { IClientItemData, ITrack } from 'types';
import './TrackModal.scss';

export interface ITrackModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const TrackModal: FC<ITrackModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();
  const { name, author, text, listenCount } = currentItemData;

  const setTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(playerActions.setCurrent(currentItemData.toServerItemData() as ITrack));
    dispatch(playerActions.changeOpen(true));
    dispatch(playerActions.changePlay(true));
  };

  const openChangeModal = () => {
    onClose();
    dispatch(modalsActions.changeIsModal({ key: 'isChangeDataTrack', boolean: true }));
  };

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div aria-hidden onClick={(e) => e.stopPropagation()} className="track-modal">
        <div className="track-modal__open-change-modal">
          <Button
            className="icon-size"
            onClick={openChangeModal}
            outline="fill"
            color="none-light"
            type="icon"
            Icon={MdOutlineEdit}
          />
        </div>
        <div className="track-modal__header">
          <div className="track-modal__image">
            <Image fontSize={170} className="track-modal__img" itemData={currentItemData} />
          </div>
          <div className="track-modal__titles">
            <div className="track-modal__track__info">
              <div className="track-modal__type">Трек</div>
              <div className="track-modal__name">{name}</div>
              <div className="track-modal__author">Автор: {author}</div>
              <div className="track-modal__likes">
                <div className="track-modal__listen">
                  <MdPeopleAlt />: {listenCount}
                </div>
                <div className="track-modal__listen">
                  <MdThumbUpAlt />: {listenCount}
                </div>
                <div className="track-modal__listen">
                  <MdStar />: {listenCount}
                </div>
              </div>
            </div>
            <div className="track-modal__play">
              <div className="track-modal__player">
                <Button onClick={setTrack} color="none-light" Icon={MdPlayArrow} text="Слушать" />
                <Button
                  className="icon-size"
                  type="icon"
                  color="none-light"
                  Icon={MdOutlineThumbUpAlt}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="track-modal__words">{text}</div>
      </div>
    </WorkplaceModal>
  );
};
