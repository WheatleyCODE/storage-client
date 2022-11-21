import React, { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  calcAndFormatSize,
  getColorClassName,
  getWorkplaceIcon,
  getWorkplaceUrl,
  transformAccess,
  transformDate,
} from 'utils';
import { ItemTypes, WorkplaceItem } from 'types';
import './StorageWorkplaceItem.scss';

export interface IStorageWorkplaceItemProps {
  item: WorkplaceItem;
  isActive: boolean;
  index: number;
  changeActive: (i: number) => void;
  addActive: (i: number) => void;
  addActiveShift: (i: number) => void;
}

export const StorageWorkplaceItem: FC<IStorageWorkplaceItemProps> = (props) => {
  const [isDragEnter, setIsDragEnter] = useState(false);
  const { item, isActive, changeActive, addActive, addActiveShift, index } = props;
  const navigate = useNavigate();

  const MemoIcon = memo(getWorkplaceIcon(item));

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
    navigate(getWorkplaceUrl(item));
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
    const { files } = e.dataTransfer;
    setIsDragEnter(false);

    console.log(files);
  }, []);

  const isFolder = item.type === ItemTypes.FOLDER;

  return (
    <div
      aria-hidden
      onClick={onClick}
      onDoubleClick={openWorkplaceItem}
      onContextMenu={onContextMenu}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={onDropHandler}
      className={`storage-workplace-item ${isActive ? 'active' : ''} ${
        isDragEnter && isFolder ? 'drag' : ''
      } ${isDragEnter && !isFolder ? 'grey' : ''}`}
    >
      <div className="storage-workplace-item__name">
        <MemoIcon className={`storage-workplace-item__icon ${getColorClassName(item)}`} />
        {item.name}
      </div>
      <div className="storage-workplace-item__access">{transformAccess(item.accessType)}</div>
      <div className="storage-workplace-item__open-date">{transformDate(item.openDate)}</div>
      <div className="storage-workplace-item__size">{calcAndFormatSize(item)}</div>
    </div>
  );
};
