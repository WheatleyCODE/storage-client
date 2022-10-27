import React, { FC, memo } from 'react';
import { CgClose } from 'react-icons/cg';
import { Calendar, Keep, Todo } from 'components';
import { additionIcons } from 'consts';
import { AdditionTypes } from 'types';
import { StorageAdditionsItem } from './storage-additions-item/StorageAdditionsItem';
import './StorageAdditions.scss';

export interface IStorageAdditionsProps {
  isOpen: boolean;
  active: AdditionTypes;
  changeActive: (type: AdditionTypes) => void;
  toggleOpen: () => void;
}

export const StorageAdditions: FC<IStorageAdditionsProps> = memo((props) => {
  const { isOpen, changeActive, active, toggleOpen } = props;

  const additionContent = {
    [AdditionTypes.CALENDAR]: Calendar,
    [AdditionTypes.KEEP]: Keep,
    [AdditionTypes.TODO]: Todo,
  };

  const ActiveContent = additionContent[active];

  const MemoIcon = memo(CgClose);

  return (
    <div className="storage-additions">
      <div className="storage-additions__icons">
        {additionIcons.map(({ Icon, type }) => (
          <StorageAdditionsItem
            key={type}
            Icon={Icon}
            changeActive={changeActive}
            type={type}
            active={type === active && isOpen}
          />
        ))}
      </div>
      {isOpen && (
        <div className="storage-additions__content">
          <div aria-hidden onClick={toggleOpen} className="storage-additions__close">
            <MemoIcon />
          </div>

          <ActiveContent />
        </div>
      )}
    </div>
  );
});
