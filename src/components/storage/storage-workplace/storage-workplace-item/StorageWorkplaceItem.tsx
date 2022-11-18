import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router';
import {
  calcAndFormatSize,
  getColorClassName,
  getWorkplaceIcon,
  getWorkplaceUrl,
  transformAccess,
  transformDate,
} from 'utils';
import { WorkplaceItem } from 'types';
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

  return (
    <div
      aria-hidden
      onClick={onClick}
      onDoubleClick={openWorkplaceItem}
      onContextMenu={onContextMenu}
      className={`storage-workplace-item ${isActive ? 'active' : ''}`}
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
