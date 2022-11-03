import React, { FC } from 'react';
import { Confirm } from 'components';
import { WorkplaceItem } from 'types';
import { DeleteWorkplaceItem } from './delete-workplace-item/DeleteWorkplaceItem';
import './DeleteItem.scss';

export interface IDeleteItem {
  currentItems: WorkplaceItem[];
}

export const DeleteItem: FC<IDeleteItem> = ({ currentItems }) => {
  return (
    <Confirm upproveText="Удалить навсегда" onClose={() => {}} onUpprove={() => {}}>
      <div className="delete-item">
        <h1 className="delete-item__title">Удалить</h1>

        {currentItems.map((item) => (
          <DeleteWorkplaceItem item={item} />
        ))}
      </div>
    </Confirm>
  );
};
