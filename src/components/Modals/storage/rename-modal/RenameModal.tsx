import React, { FC } from 'react';
import { Confirm, Input, Portal, Backdrop, Modal } from 'components';
import { useActions, useValidInput } from 'hooks';
import { nameValidator, PropertyFactory } from 'helpers';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import { WorkplaceItem } from 'types';
import './RenameModal.scss';

export interface IRenameModalProps {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const RenameModal: FC<IRenameModalProps> = ({ currentItems, onClose }) => {
  const nameInput = useValidInput([nameValidator]);
  const itemData = PropertyFactory.create(currentItems[0]);
  const { changeName } = useActions();

  const renameHandler = () => {
    if (nameInput.isError || !nameInput.value) return;
    const { id, type } = itemData;

    onClose();
    changeName({ id, name: nameInput.value, type, isCanRestore: true, prevName: itemData.name });
  };

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm upproveText="Переименовать" onClose={onClose} onUpprove={renameHandler}>
            <div className={`rename-modal ${getColorClassName(itemData)}`}>
              <h1 className="rename-modal__title">Переименовать</h1>

              <Input
                Icon={getWorkplaceIcon(itemData)}
                value={nameInput.value}
                type="text"
                placeholder="Новое имя"
                onChange={nameInput.onChange}
                onBlur={nameInput.onBlur}
                onFocus={nameInput.onFocus}
                isError={nameInput.isError}
                validError={nameInput.validError}
                isActive={nameInput.isActive}
                changeFocus={nameInput.changeFocus}
                changeActive={nameInput.changeActive}
              />
            </div>
          </Confirm>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
