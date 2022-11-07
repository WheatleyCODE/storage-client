import React, { FC } from 'react';
import { Confirm } from 'components';
import { useActions } from 'hooks';
import { WorkplaceItem } from 'types';
import { DeleteWorkplaceItem } from './delete-workplace-item/DeleteWorkplaceItem';
import './DeleteItem.scss';

export interface IDeleteItem {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const DeleteItem: FC<IDeleteItem> = ({ currentItems, onClose }) => {
  const { deleteItems } = useActions();

  const deleteHandler = () => {
    onClose();
    deleteItems({
      items: currentItems.map(({ id, type }) => ({ id, type })),
    });
  };

  return (
    <Confirm upproveText="Удалить навсегда" onClose={onClose} onUpprove={deleteHandler}>
      <div className="delete-item">
        <h1 className="delete-item__title">Удалить</h1>

        {currentItems.map((item) => (
          <DeleteWorkplaceItem key={item.id} item={item} />
        ))}
      </div>
    </Confirm>
  );
};
