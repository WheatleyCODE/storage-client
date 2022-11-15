import React, { FC, memo, useCallback } from 'react';
import { MdArrowBack, MdOutlineRemoveRedEye, MdRemoveRedEye } from 'react-icons/md';
import { getImageLink, getWorkplaceIcon } from 'utils';
import { WorkplaceItem } from 'types';
import './ImageModal.scss';

export interface IImageModalProps {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const ImageModal: FC<IImageModalProps> = ({ currentItems, onClose }) => {
  const item = currentItems[0];
  const imageLink = getImageLink(item);
  const MemoArrow = memo(MdArrowBack);
  const MemoIcon = memo(getWorkplaceIcon(item));

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <div aria-hidden onClick={stopPropagation} className="image-modal">
      <div className="image-modal__header">
        <div className="image-modal__title">
          <div aria-hidden onClick={onClose} className="image-modal__arrow">
            <MemoArrow />
          </div>
          <div className="image-modal__name">
            <MemoIcon className="image-modal__icon" />
            {item.name}
          </div>
        </div>
        <div className="image-modal__action">
          <MdOutlineRemoveRedEye className="image-modal__icon" />
          Только просмотр
        </div>
        {/* <div className="image-modal__menu">
          <h1>name</h1>
        </div> */}
      </div>
      {imageLink && (
        <div className="image-modal__image">
          <img src={imageLink} alt="Картика" />
        </div>
      )}
    </div>
  );
};
