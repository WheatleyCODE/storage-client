import React, { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { MdPlayArrow } from 'react-icons/md';
import { useActions, useItems, useOpenModal, usePlayerHandlers } from 'hooks';
import {
  formatSize,
  getColorClassName,
  getWorkplaceIcon,
  getWorkplaceUrl,
  transformAccess,
  transformDate,
} from 'utils';
import { IClientItemData, ItemTypes, ITrack } from 'types';
import './StorageWorkplaceItem.scss';

export interface IStorageWorkplaceItemProps {
  itemData: IClientItemData;
  isActive: boolean;
  index: number;
  changeActive: (i: number) => void;
  addActive: (i: number) => void;
  addActiveShift: (i: number) => void;
}

export const StorageWorkplaceItem: FC<IStorageWorkplaceItemProps> = (props) => {
  const { itemData, isActive, changeActive, addActive, addActiveShift, index } = props;
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isShowPlay, setIsShowPlay] = useState(false);
  const tracks = useItems({ onlyTypes: [ItemTypes.TRACK], isParent: true }, true) as ITrack[];
  const { playTrack } = usePlayerHandlers();
  const navigate = useNavigate();
  const { uploadFiles } = useActions();
  const openModal = useOpenModal();

  const MemoIcon = memo(getWorkplaceIcon(itemData));

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      addActive(index);
      return;
    }

    if (e.shiftKey) {
      addActiveShift(index);
      return;
    }

    changeActive(index);
  };

  const onContextMenu = () => {
    if (!isActive) {
      changeActive(index);
    }
  };

  const openWorkplaceItem = () => {
    if (itemData.openModalStateKey) {
      openModal(itemData.openModalStateKey, false);
      return;
    }

    navigate(getWorkplaceUrl(itemData));
  };

  const onEnter = () => {
    if (itemData.type === ItemTypes.TRACK || itemData.type === ItemTypes.ALBUM) {
      setIsShowPlay(true);
    }
  };

  const onLeave = () => {
    if (itemData.type === ItemTypes.TRACK || itemData.type === ItemTypes.ALBUM) {
      setIsShowPlay(false);
    }
  };

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

  return (
    <div
      aria-hidden
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onDoubleClick={openWorkplaceItem}
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
            <MdPlayArrow
              onClick={() => playTrack(itemData, tracks)}
              className="storage-workplace-item__icon play"
            />
          </div>
        )}
        {!isShowPlay && (
          <MemoIcon className={`storage-workplace-item__icon ${getColorClassName(itemData)}`} />
        )}
        {itemData.name}
      </div>
      <div className="storage-workplace-item__access">{transformAccess(itemData.accessType)}</div>
      <div className="storage-workplace-item__open-date">{transformDate(itemData.changeDate)}</div>
      <div className="storage-workplace-item__size">{formatSize(itemData.getSize())}</div>
    </div>
  );
};
