import React, { FC, memo, useCallback, useState } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { MdBookmark, MdPlayArrow } from 'react-icons/md';
import {
  formatSize,
  getColorClassName,
  getWorkplaceIcon,
  transformAccess,
  transformDate,
} from 'utils';
import { IClientItemData, IServerItemData, ItemTypes, ITrack, IUploadFilesFilds } from 'types';
import './StorageWorkplaceItem.scss';

export interface IStorageWorkplaceItemProps {
  itemData: IClientItemData;
  tracks: ITrack[];
  isStar: boolean;
  isActive: boolean;
  index: number;
  changeActive: (i: number) => void;
  addActive: (i: number) => void;
  addActiveShift: (i: number) => void;
  setTrack: (itemData: IClientItemData, tracks: ITrack[]) => void;
  uploadFiles: AsyncThunk<IServerItemData[], IUploadFilesFilds, any>;
  openWorkpaceItem: () => void;
}

export const StorageWorkplaceItem: FC<IStorageWorkplaceItemProps> = (props) => {
  const {
    itemData,
    isActive,
    changeActive,
    addActive,
    addActiveShift,
    index,
    tracks,
    isStar,
    setTrack,
    uploadFiles,
    openWorkpaceItem,
  } = props;
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isShowPlay, setIsShowPlay] = useState(false);

  const MemoIcon = memo(getWorkplaceIcon(itemData));
  const MemoMark = memo(MdBookmark);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.ctrlKey) {
        addActive(index);
        return;
      }

      if (e.shiftKey) {
        addActiveShift(index);
        return;
      }

      changeActive(index);
    },
    [changeActive, index, addActive, addActiveShift]
  );

  const onContextMenu = useCallback(() => {
    if (!isActive) {
      changeActive(index);
    }
  }, [isActive, changeActive, index]);

  const onEnter = useCallback(() => {
    if (itemData.type === ItemTypes.TRACK || itemData.type === ItemTypes.ALBUM) {
      setIsShowPlay(true);
    }
  }, [itemData.type]);

  const onLeave = useCallback(() => {
    if (itemData.type === ItemTypes.TRACK || itemData.type === ItemTypes.ALBUM) {
      setIsShowPlay(false);
    }
  }, [itemData.type]);

  const onDragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(true);
  }, []);

  const onDragLeaveHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(false);
  }, []);

  const onDropHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...(e.dataTransfer.files as any)];
    setIsDragEnter(false);
    uploadFiles({ files, parent: itemData.id });
  }, []);

  const isFolder = itemData.type === ItemTypes.FOLDER;

  const setTrackHandler = useCallback(() => {
    setTrack(itemData, tracks);
  }, [itemData, tracks]);

  return (
    <div
      aria-hidden
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onDoubleClick={openWorkpaceItem}
      onContextMenu={onContextMenu}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={isFolder ? onDropHandler : undefined}
      className={`storage-workplace-item ${isActive ? 'active' : ''} ${
        isDragEnter && isFolder ? 'drag' : ''
      } ${isDragEnter && !isFolder ? 'grey' : ''}`}
    >
      <div className="storage-workplace-item__name">
        {isShowPlay && (
          <div className="storage-workplace-item__play">
            <MdPlayArrow onClick={setTrackHandler} className="storage-workplace-item__icon play" />
          </div>
        )}

        {!isShowPlay && (
          <MemoIcon className={`storage-workplace-item__icon ${getColorClassName(itemData)}`} />
        )}

        {itemData.name}

        {isStar && (
          <div className="storage-workplace-item__star">
            <MemoMark className="storage-workplace-item__star-icon" />
          </div>
        )}
      </div>
      <div className="storage-workplace-item__access">{transformAccess(itemData.accessType)}</div>
      <div className="storage-workplace-item__open-date">{transformDate(itemData.changeDate)}</div>
      <div className="storage-workplace-item__size">{formatSize(itemData.getSize())}</div>
    </div>
  );
};
