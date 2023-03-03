import React, { FC, memo } from 'react';
import { formatSize, getWorkplaceIcon } from 'utils';
import { PropertyFactory } from 'helpers';
import { WorkplaceItem } from 'types';
import './DeleteWorkplaceItem.scss';

export interface IDeleteWorkplaceItem {
  item: WorkplaceItem;
}

export const DeleteWorkplaceItem: FC<IDeleteWorkplaceItem> = ({ item }) => {
  const itemData = PropertyFactory.create(item);
  const MemoIcon = memo(getWorkplaceIcon(itemData));

  return (
    <div className="delete-workplace-item">
      <div className="delete-workplace-item__icon">
        <MemoIcon />
      </div>
      <div className="delete-workplace-item__name">{itemData.name}</div>
      <div className="delete-workplace-item__size">{formatSize(itemData.getSize())}</div>
    </div>
  );
};
