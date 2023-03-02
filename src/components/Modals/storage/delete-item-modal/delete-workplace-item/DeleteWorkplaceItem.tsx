import React, { FC, memo } from 'react';
import { getWorkplaceIcon } from 'utils';
import { WorkplaceItem } from 'types';
import './DeleteWorkplaceItem.scss';

export interface IDeleteWorkplaceItem {
  item: WorkplaceItem;
}

export const DeleteWorkplaceItem: FC<IDeleteWorkplaceItem> = ({ item }) => {
  const MemoIcon = memo(getWorkplaceIcon(item));

  return (
    <div className="delete-workplace-item">
      <div className="delete-workplace-item__icon">
        <MemoIcon />
      </div>
      <div className="delete-workplace-item__name">{item.name}</div>
      <div className="delete-workplace-item__size">calcAndFormatSizeFix</div>
    </div>
  );
};
