import React, { FC } from 'react';
import { Confirm, Portal, Backdrop, Modal } from 'components';
import { useActions } from 'hooks';
import { IClientItemData } from 'types';
import { DeleteWorkplaceItem } from './delete-workplace-item/DeleteWorkplaceItem';
import './DeleteModal.scss';

export interface IDeleteModal {
  currentItemsData: IClientItemData[];
  onClose: () => void;
}

export const DeleteModal: FC<IDeleteModal> = ({ currentItemsData, onClose }) => {
  const { deleteItems } = useActions();

  const deleteHandler = () => {
    onClose();
    deleteItems({
      items: currentItemsData.map(({ id, type }) => ({ id, type })),
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
                {currentItemsData.map((itemData) => (
                  <DeleteWorkplaceItem key={itemData.id} itemData={itemData} />
                ))}
              </div>
            </div>
          </Confirm>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
