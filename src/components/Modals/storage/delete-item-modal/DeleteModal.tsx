import React, { FC } from 'react';
import { Confirm, Portal, Backdrop, Modal } from 'components';
import { useActions } from 'hooks';
import { WorkplaceItem } from 'types';
import { DeleteWorkplaceItem } from './delete-workplace-item/DeleteWorkplaceItem';
import './DeleteModal.scss';

export interface IDeleteModal {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const DeleteModal: FC<IDeleteModal> = ({ currentItems, onClose }) => {
  const { deleteItems } = useActions();

  const deleteHandler = () => {
    onClose();
    deleteItems({
      items: currentItems.map(({ id, type }) => ({ id, type })),
    });
  };

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm upproveText="Удалить навсегда" onClose={onClose} onUpprove={deleteHandler}>
            <div className="delete-modal">
              <h1 className="delete-modal__title">Удалить</h1>

              <div className="delete-modal__items">
                {currentItems.map((item) => (
                  <DeleteWorkplaceItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </Confirm>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
