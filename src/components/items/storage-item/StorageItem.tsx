import React, { FC, memo, useState, useCallback } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { useAudioPlayerHandlers } from 'hooks';
import { IClientItemData } from 'types';
import { formatSize, getWorkplaceIcon } from 'utils';
import './StorageItem.scss';

export interface StorageItemProps {
  itemData: IClientItemData;
  isSelect?: boolean;
  isShowSize?: boolean;
  selectItem?: (item: IClientItemData) => void;
  deleteItem?: (item: IClientItemData) => void;
  isPlay?: boolean;
  isDark?: boolean;
}

export const StorageItem: FC<StorageItemProps> = memo(
  ({ itemData, isSelect, selectItem, deleteItem, isShowSize, isPlay, isDark }) => {
    const { setTrack } = useAudioPlayerHandlers();
    const [isShowPlay, setIsShowPlay] = useState(false);
    const MemoIcon = memo(getWorkplaceIcon(itemData));

    const onClick = () => {
      if (isSelect && deleteItem) deleteItem(itemData);
      if (!isSelect && selectItem) selectItem(itemData);
    };

    const onEnter = useCallback(() => {
      setIsShowPlay(true);
    }, []);

    const onLeave = useCallback(() => {
      setIsShowPlay(false);
    }, []);

    const setTrackHandler = useCallback(() => {
      setTrack(itemData, []);
    }, [itemData, setTrack]);

    return (
      <div
        onMouseEnter={isPlay ? onEnter : undefined}
        onMouseLeave={isPlay ? onLeave : undefined}
        onClick={onClick}
        aria-hidden
        className={`storage-item ${isSelect && 'selected'} ${isDark && 'dark'}`}
      >
        {isPlay && isShowPlay && (
          <div className="storage-item__play">
            <MdPlayArrow onClick={setTrackHandler} className="storage-item__icon-play" />
          </div>
        )}
        {isPlay && !isShowPlay && (
          <div className="storage-item__icon">
            <MemoIcon />
          </div>
        )}
        <div className="storage-item__name">{itemData.name}</div>
        {isShowSize && <div className="storage-item__size">{formatSize(itemData.getSize())}</div>}
      </div>
    );
  }
);
