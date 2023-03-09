import React, { FC, memo, useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import { Calendar, Keep, Todo, Button } from 'components';
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

  // ! Fix, add content
  const additionContent = useMemo(
    () => ({
      [AdditionTypes.CALENDAR]: Calendar,
      [AdditionTypes.KEEP]: Keep,
      [AdditionTypes.TODO]: Todo,
    }),
    []
  );

  const ActiveContent = additionContent[active];

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
          <div className="storage-additions__close">
            <Button
              color="none-dark"
              radius="rounded"
              outline="fill"
              onClick={toggleOpen}
              type="icon"
              Icon={MdClose}
            />
          </div>

          <ActiveContent />
        </div>
      )}
    </div>
  );
});
