import React, { FC, memo, useCallback, useState } from 'react';
import { AnimationControls } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Calendar, Keep, Todo } from 'components';
import { additionIcons } from 'consts';
import { AdditionTypes } from 'types';
import { StorageAdditionsItem } from './storage-additions-item/StorageAdditionsItem';
import './StorageAdditions.scss';

export interface IStorageAdditionsProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageAdditions: FC<IStorageAdditionsProps> = memo((props) => {
  const { isOpen, toggleOpen, controls } = props;
  const [active, setActive] = useState<AdditionTypes>(AdditionTypes.CALENDAR);

  const additionContent = {
    [AdditionTypes.CALENDAR]: Calendar,
    [AdditionTypes.KEEP]: Keep,
    [AdditionTypes.TODO]: Todo,
  };

  const ActiveContent = additionContent[active];

  const changeActive = useCallback(
    (type: AdditionTypes) => {
      if (type === active) {
        toggleOpen();
        return;
      }

      if (isOpen) {
        setActive(type);
        return;
      }

      toggleOpen();
      setActive(type);
    },
    [isOpen, toggleOpen, active]
  );

  const MemoIcon = memo(FaTimes);

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
