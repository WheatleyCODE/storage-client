import React, { FC, memo, useCallback } from 'react';
import { IconType } from 'react-icons';
import { Button } from 'components';
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

  return (
    <div className="storage-additions-item">
      <Button
        className={`${active ? 'active' : ''}`}
        color="none-dark"
        outline="fill"
        onClick={onClick}
        type="icon"
        Icon={Icon}
      />
    </div>
  );
});
