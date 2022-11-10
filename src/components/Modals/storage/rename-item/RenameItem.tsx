import React, { FC } from 'react';
import { Confirm, Input } from 'components';
import { useActions, useValidInput } from 'hooks';
import { nameValidator } from 'helpers';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import { WorkplaceItem } from 'types';
import './RenameItem.scss';

export interface IRenameItemProps {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const RenameItem: FC<IRenameItemProps> = ({ currentItems, onClose }) => {
  const nameInput = useValidInput([nameValidator]);
  const item = currentItems[0];
  const { changeName } = useActions();

  const renameHandler = () => {
    if (nameInput.isError || !nameInput.value) return;
    const { id, type } = item;

    onClose();
    changeName({ id, name: nameInput.value, type, isCanRestore: true, prevName: item.name });
  };

  return (
    <Confirm upproveText="Переименовать" onClose={onClose} onUpprove={renameHandler}>
      <div className={`rename-item ${getColorClassName(item)}`}>
        <h1 className="rename-item__title">Переименовать</h1>

        <Input
          Icon={getWorkplaceIcon(item)}
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
  );
};
