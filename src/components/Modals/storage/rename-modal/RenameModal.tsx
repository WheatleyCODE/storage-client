import React, { FC } from 'react';
import { Confirm, Input, Portal, Backdrop, Modal } from 'components';
import { useActions, useValidInput } from 'hooks';
import { nameValidator } from 'helpers';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import { IItemProperties } from 'types';
import './RenameModal.scss';

export interface IRenameModalProps {
  currentItemData: IItemProperties;
  onClose: () => void;
}

export const RenameModal: FC<IRenameModalProps> = ({ currentItemData, onClose }) => {
  const nameInput = useValidInput([nameValidator]);
  const { changeName } = useActions();

  const renameHandler = () => {
    if (nameInput.isError || !nameInput.value) return;
    const { id, type } = currentItemData;

    onClose();
    changeName({
      id,
      name: nameInput.value,
      type,
      isCanRestore: true,
      prevName: currentItemData.name,
    });
  };

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm upproveText="Переименовать" onClose={onClose} onUpprove={renameHandler}>
            <div className={`rename-modal ${getColorClassName(currentItemData)}`}>
              <h1 className="rename-modal__title">Переименовать</h1>

              <Input
                Icon={getWorkplaceIcon(currentItemData)}
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
