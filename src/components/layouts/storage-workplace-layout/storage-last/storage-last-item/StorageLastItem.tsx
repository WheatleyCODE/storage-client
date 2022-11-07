import React, { FC, memo } from 'react';
import { WorkplaceItem } from 'types';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import './StorageLastItem.scss';

export interface IStorageLastItemProps {
  item: WorkplaceItem;
  isActive: boolean;
  changeActive: (i: number) => void;
  index: number;
}

export const StorageLastItem: FC<IStorageLastItemProps> = memo((props) => {
  const { item, changeActive, index, isActive } = props;
  const MemoIcon = memo(getWorkplaceIcon(item));

  const onClick = () => {
    changeActive(index);
  };

  return (
    <div
      aria-hidden
      onClick={onClick}
      onContextMenu={onClick}
      className={`storage-last-item ${isActive ? 'active' : ''}`}
    >
      <div className={`storage-last-item__icon ${getColorClassName(item)}`}>
        <MemoIcon />
      </div>
      <div className="storage-last-item__name">{item.name}</div>
    </div>
  );
});
