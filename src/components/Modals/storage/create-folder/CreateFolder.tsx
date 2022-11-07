import React, { FC } from 'react';
import { MdFolder } from 'react-icons/md';
import { Confirm, Input } from 'components';
import { useActions, useValidInput } from 'hooks';
import { nameValidator } from 'helpers';
import './CreateFolder.scss';

export interface ICreateFolderProps {
  onClose: () => void;
}

export const CreateFolder: FC<ICreateFolderProps> = ({ onClose }) => {
  const nameInput = useValidInput([nameValidator]);
  const { createFolder } = useActions();

  const createFolderHandler = () => {
    if (nameInput.isError || !nameInput.value) return;

    onClose();
    createFolder({ name: nameInput.value });
  };

  return (
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
  );
};
