import React, { FC } from 'react';
import { MdFolder } from 'react-icons/md';
import { useParams } from 'react-router';
import { Confirm, Input, Portal, Backdrop, Modal } from 'components';
import { useActions, useValidInput } from 'hooks';
import { nameValidator } from 'helpers';
import './CreateFolderModal.scss';

export interface ICreateFolderModalProps {
  onClose: () => void;
}

export const CreateFolderModal: FC<ICreateFolderModalProps> = ({ onClose }) => {
  const nameInput = useValidInput([nameValidator]);
  const params = useParams();
  const { createFolder } = useActions();

  const createFolderHandler = () => {
    if (nameInput.isError || !nameInput.value) return;

    const { id } = params;

    onClose();
    createFolder({ name: nameInput.value, parent: id });
  };

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm onClose={onClose} onUpprove={createFolderHandler}>
            <div className="create-folder">
              <h1 className="create-folder__title">Новая папка</h1>

              <Input
                Icon={MdFolder}
                value={nameInput.value}
                type="text"
                placeholder="Имя папки"
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
