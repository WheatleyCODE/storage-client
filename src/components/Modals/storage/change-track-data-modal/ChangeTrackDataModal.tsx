import React, { FC } from 'react';
import { Button, Image, StorageItem, WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './ChangeTrackDataModal.scss';
import { MdOutlineEdit } from 'react-icons/md';
import { getImageLink } from 'utils';

export interface IChangeTrackDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeTrackDataModal: FC<IChangeTrackDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;
  const { name, author, text } = currentItemData;

  return (
    <WorkplaceModal isChange currentItemData={currentItemData} onClose={onClose}>
      <div className="change-data-track-modal">
        <div className="change-data-track-modal__image">
          <Image
            fontSize={100}
            className="change-data-track-modal__img"
            itemData={currentItemData}
          />
          <div className="change-data-track-modal__id">ID: {currentItemData.id}</div>
          <div className="change-data-track-modal__button">
            <Button
              className="font-size"
              outline="fill"
              color="none-light"
              type="icon"
              Icon={MdOutlineEdit}
            />
          </div>
        </div>

        <div className="change-data-track-modal__track">
          <div className="change-data-track-modal__current">
            <StorageItem isShowSize isDark isPlay itemData={currentItemData} />
          </div>
          <div className="change-data-track-modal__button">
            <Button
              className="font-size"
              outline="fill"
              color="none-light"
              type="icon"
              Icon={MdOutlineEdit}
            />
          </div>
        </div>

        <div className="change-data-track-modal__data">
          <div className="change-data-track-modal__track-data">
            <div className="change-data-track-modal__name">Название: {name}</div>
            <div className="change-data-track-modal__name">Автор: {author}</div>
            <div className="change-data-track-modal__name">Текст: {text}</div>
          </div>
          <div className="change-data-track-modal__button">
            <Button
              className="font-size"
              outline="fill"
              color="none-light"
              type="icon"
              Icon={MdOutlineEdit}
            />
          </div>
        </div>
      </div>
    </WorkplaceModal>
  );
};
