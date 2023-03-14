import React, { FC, useCallback } from 'react';
import { Image, Button, ItemModalInfo } from 'components';
import {
  MdOutlineThumbUpAlt,
  MdPlayArrow,
  MdStar,
  MdStarOutline,
  MdThumbUpAlt,
} from 'react-icons/md';
import { IClientItemData } from 'types';
import { useActions, useTypedSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { storageActions } from 'store';
import './MusicItemInfo.scss';

export interface IMusicItemInfoProps {
  itemData: IClientItemData;
  children: React.ReactNode;
  typeName: string;
  onPlayHandler: () => void;
}

export const MusicItemInfo: FC<IMusicItemInfoProps> = (props) => {
  const { itemData, children, typeName, onPlayHandler } = props;
  const { user } = useTypedSelector((state) => state.auth);
  const { likedItems, staredItems } = useTypedSelector((state) => state.storage);
  const dispatch = useDispatch();
  const { changeLike, changeStar } = useActions();
  const { name, id, type, author } = itemData;

  const isEqualLike = !!likedItems.find((str) => str === id);
  const isEqualStar = !!staredItems.find((str) => str === id);

  const changeLikeHandler = useCallback(() => {
    dispatch(storageActions.changeLiked({ id, isLike: !isEqualLike }));
    changeLike({ id, type, user: user.id, isLike: !isEqualLike });
  }, [changeLike, id, isEqualLike, type, user.id]);

  const changeStarHandler = useCallback(() => {
    dispatch(storageActions.changeStared({ id, isStar: !isEqualStar }));
    changeStar({ items: [{ id, type }], user: user.id, isStar: !isEqualStar });
  }, [changeLike, id, isEqualStar, type, user.id]);

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
            <ItemModalInfo itemData={itemData} />
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
                onClick={changeLikeHandler}
                className="icon-size"
                type="icon"
                color="none-light"
                Icon={isEqualLike ? MdThumbUpAlt : MdOutlineThumbUpAlt}
              />
              <Button
                onClick={changeStarHandler}
                className="icon-size"
                type="icon"
                color="none-light"
                Icon={isEqualStar ? MdStar : MdStarOutline}
              />
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};
