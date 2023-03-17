import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineThumbUpAlt, MdStar, MdStarOutline, MdThumbUpAlt } from 'react-icons/md';
import { storageActions } from 'store';
import { Button } from 'components';
import { useActions, useTypedSelector } from 'hooks';
import { formatSize } from 'utils';
import { IClientItemData } from 'types';
import { ItemModalInfo } from '../item-modal-info/ItemModalInfo';
import './FileItemInfo.scss';

export interface IFileItemInfoProps {
  itemData: IClientItemData;
}

export const FileItemInfo: FC<IFileItemInfoProps> = ({ itemData }) => {
  const { user } = useTypedSelector((state) => state.auth);
  const { likedItems, staredItems } = useTypedSelector((state) => state.storage);
  const dispatch = useDispatch();
  const { changeLike, changeStar } = useActions();
  const { name, fileExt, id, type } = itemData;

  const isEqualLike = !!likedItems.find((str) => str === id);
  const isEqualStar = !!staredItems.find((str) => str === id);

  const changeLikeHandler = useCallback(() => {
    dispatch(storageActions.changeLiked({ id, isLike: !isEqualLike }));
    changeLike({ id, type, user: user.id, isLike: !isEqualLike });
  }, [changeLike, id, isEqualLike, type, user.id]);

  const changeStarHandler = useCallback(() => {
    dispatch(storageActions.changeStared({ ids: [id], isStar: !isEqualStar }));
    changeStar({ items: [{ id, type }], user: user.id, isStar: !isEqualStar });
  }, [changeLike, id, isEqualStar, type, user.id]);

  return (
    <div className="file-item-info">
      <div className="file-item-stats">
        <div className="file-item-info__name">Название: {name}</div>
        <div className="file-item-info__ext">Разширение: .{fileExt}</div>
        <div className="file-item-info__size">Размер: {formatSize(itemData.getSize())}</div>
      </div>

      <div className="file-item-info__actions">
        <ItemModalInfo itemData={itemData} />

        <div className="file-item-info__buttons">
          <Button
            onClick={changeLikeHandler}
            text="Лайк"
            color="none-light"
            Icon={isEqualLike ? MdThumbUpAlt : MdOutlineThumbUpAlt}
          />
          <Button
            onClick={changeStarHandler}
            type="icon"
            className="icon-size margin-left"
            color="none-light"
            Icon={isEqualStar ? MdStar : MdStarOutline}
          />
        </div>
      </div>
    </div>
  );
};
