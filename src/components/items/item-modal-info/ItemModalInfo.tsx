import React, { FC } from 'react';
import { MdPeopleAlt, MdStar, MdThumbUpAlt } from 'react-icons/md';
import { IClientItemData } from 'types';
import './ItemModalInfo.scss';

export interface ItemModalInfoProps {
  itemData: IClientItemData;
}

export const ItemModalInfo: FC<ItemModalInfoProps> = ({ itemData }) => {
  const { listenCount, likeCount, starredCount } = itemData;

  return (
    <div className="item-modal-info">
      <div className="item-modal-info__listen-count">
        <MdPeopleAlt className="icon" />: {listenCount}
      </div>
      <div className="item-modal-info__like-count">
        <MdThumbUpAlt className="icon" />: {likeCount}
      </div>
      <div className="item-modal-info__star-count">
        <MdStar className="icon" />: {starredCount}
      </div>
    </div>
  );
};
