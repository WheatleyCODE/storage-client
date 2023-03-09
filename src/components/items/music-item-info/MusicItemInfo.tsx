import React, { FC } from 'react';
import { Image, Button } from 'components';
import './MusicItemInfo.scss';
import {
  MdOutlineThumbUpAlt,
  MdPeopleAlt,
  MdPlayArrow,
  MdStar,
  MdThumbUpAlt,
} from 'react-icons/md';
import { IClientItemData } from 'types';

export interface IMusicItemInfoProps {
  itemData: IClientItemData;
  children: React.ReactNode;
  typeName: string;
  onPlayHandler: () => void;
}

export const MusicItemInfo: FC<IMusicItemInfoProps> = (props) => {
  const { itemData, children, typeName, onPlayHandler } = props;
  const { name, author, likeCount, listenCount, likedUsers, starredCount } = itemData;

  return (
    <div className="music-item-info">
      <div className="music-item-info__header">
        <div className="music-item-info__image">
          <Image fontSize={170} className="music-item-info__img" itemData={itemData} />
        </div>

        <div className="music-item-info__titles">
          <div className="music-item-info__track-info">
            <div className="music-item-info__type-name">{typeName}</div>
            <div className="music-item-info__name">{name}</div>
            <div className="music-item-info__author">{author}</div>
            <div className="music-item-info__likes">
              <div className="music-item-info__listen-count">
                <MdPeopleAlt />: {listenCount}
              </div>
              <div className="music-item-info__like-count">
                <MdThumbUpAlt />: {likeCount}
              </div>
              <div className="music-item-info__star-count">
                <MdStar />: {starredCount}
              </div>
            </div>
          </div>

          <div className="music-item-info__play">
            <div className="music-item-info__play-buttons">
              <Button
                onClick={onPlayHandler}
                color="none-light"
                Icon={MdPlayArrow}
                text="Слушать"
              />
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

      {children}
    </div>
  );
};
