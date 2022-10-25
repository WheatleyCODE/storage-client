import React, { FC, memo, useCallback } from 'react';
import { IconType } from 'react-icons';
import { AdditionTypes } from 'types';
import './StorageAdditionsItem.scss';

export interface IStorageAdditionsItemProps {
  Icon: IconType;
  type: AdditionTypes;
  changeActive: (type: AdditionTypes) => void;
  active: boolean;
}

export const StorageAdditionsItem: FC<IStorageAdditionsItemProps> = memo((props) => {
  const { Icon, active, type, changeActive } = props;

  const onClick = useCallback(() => {
    changeActive(type);
  }, [type, changeActive]);

  const MemoIcon = memo(Icon);

  return (
    <div
      aria-hidden
      onClick={onClick}
      className={`storage-additions-item ${active ? 'active' : ''}`}
    >
      <MemoIcon />
    </div>
  );
});
