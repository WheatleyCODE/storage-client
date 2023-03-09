import React, { FC } from 'react';
import { MdOutlineEdit, MdPlayArrow } from 'react-icons/md';
import { WorkplaceModal, Button, StorageItem } from 'components';
import { getImageLink } from 'utils';
import { IClientItemData } from 'types';
import './AlbumModal.scss';
import { PropertyFactory } from 'helpers';
import { modalsActions } from 'store';
import { useDispatch } from 'react-redux';

export interface IAlbumModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const AlbumModal: FC<IAlbumModalProps> = ({ onClose, currentItemData }) => {
  const dispatch = useDispatch();
  const imageLink = getImageLink(currentItemData);
  const { name, author } = currentItemData;

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
            {imageLink && <img src={imageLink} alt="Картинка трека" />}
          </div>
          <div className="album-modal__titles">
            <div className="album-modal__track__info">
              <div className="album-modal__name">{name}</div>
              <div className="album-modal__author">{author}</div>
            </div>
            <div className="album-modal__play">
              <div className="album-modal__player">
                <Button color="none-light" Icon={MdPlayArrow} text="Слушать" />
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
