import React, { FC } from 'react';
import { Button, WorkplaceModal } from 'components';
import { IClientItemData } from 'types';
import './ChangeTrackDataModal.scss';
import { getImageLink } from 'utils';

export interface IChangeTrackDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeTrackDataModal: FC<IChangeTrackDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;
  const imageLink = getImageLink(currentItemData);
  const { name, author } = currentItemData;

  return (
    <WorkplaceModal isChange currentItemData={currentItemData} onClose={onClose}>
      <div className="change-data-track-modal">
        <div className="change-data-track-modal__image">
          {imageLink && <img src={imageLink} alt="Картинка трека" />}
          <Button color="black" text="Изменить картинку" />
        </div>

        <div className="change-data-track-modal__track">
          <div className="change-data-track-modal__track-data">
            <div className="change-data-track-modal__name">{name}</div>
            <div className="change-data-track-modal__name">{author}</div>
          </div>
          <Button color="black" text="Изменить трек" />
        </div>

        <div className="change-data-track-modal__data">
          <Button color="black" text="Изменить описание" />
        </div>
        <div className="change-data-track-modal__data">
          <Button outline="fill" color="green" text="Сохранить" />
        </div>
      </div>
    </WorkplaceModal>
  );
};
