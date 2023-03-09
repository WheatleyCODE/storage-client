import React, { FC } from 'react';
import {
  MdOutlineEdit,
  MdOutlineThumbUpAlt,
  MdPeopleAlt,
  MdPlayArrow,
  MdStar,
  MdThumbUpAlt,
} from 'react-icons/md';
import { WorkplaceModal, Button, StorageItem, Image } from 'components';
import { IClientItemData } from 'types';
import './AlbumModal.scss';
import { PropertyFactory } from 'helpers';
import { modalsActions } from 'store';
import { useDispatch } from 'react-redux';
import { usePlayerHandlers } from 'hooks';

export interface IAlbumModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const AlbumModal: FC<IAlbumModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();
  const { playTrack } = usePlayerHandlers();
  const { name, author, listenCount, likeCount, starredCount } = currentItemData;

  const albumTracks = currentItemData.tracks;

  if (!albumTracks) {
    onClose();
    return <div />;
  }

  const tracksData = albumTracks.map((track) => PropertyFactory.create(track));
  const isNoTracks = !!tracksData.length;

  const openChangeModal = () => {
    onClose();
    dispatch(modalsActions.changeIsModal({ key: 'isChangeDataAlbum', boolean: true }));
  };

  const play = () => {
    playTrack(currentItemData, currentItemData.tracks || []);
  };

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <div aria-hidden onClick={(e) => e.stopPropagation()} className="album-modal">
        <div className="album-modal__open-change-modal">
          <Button
            onClick={openChangeModal}
            outline="fill"
            color="none-light"
            type="icon"
            Icon={MdOutlineEdit}
          />
        </div>
        <div className="album-modal__header">
          <div className="album-modal__image">
            <Image fontSize={170} className="track-modal__img" itemData={currentItemData} />
          </div>
          <div className="album-modal__titles">
            <div className="album-modal__track__info">
              <div className="album-modal__type">Альбом</div>
              <div className="album-modal__name">{name}</div>
              <div className="album-modal__author">{author}</div>
              <div className="album-modal__likes">
                <div className="album-modal__listen">
                  <MdPeopleAlt />: {listenCount}
                </div>
                <div className="track-modal__listen">
                  <MdThumbUpAlt />: {likeCount}
                </div>
                <div className="track-modal__listen">
                  <MdStar />: {starredCount}
                </div>
              </div>
            </div>
            <div className="album-modal__play">
              <div className="album-modal__player">
                <Button onClick={play} color="none-light" Icon={MdPlayArrow} text="Слушать" />
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
        <div className="album-modal__tracks">
          {!isNoTracks && <div>Треков нет</div>}
          {tracksData.map((track) => (
            <StorageItem key={track.id} isDark isPlay itemData={track} />
          ))}
        </div>
      </div>
    </WorkplaceModal>
  );
};
