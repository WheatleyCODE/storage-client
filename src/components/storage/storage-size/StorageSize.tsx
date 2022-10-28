import React, { FC, memo } from 'react';
import { AiOutlineCloud } from 'react-icons/ai';
import { Button } from 'components';
import { getPercent, getProgressColor, formatSize } from 'utils';
import './StorageSize.scss';

export interface IStorageSizeProps {
  diskSpace: number;
  usedSpace: number;
}

export const StorageSize: FC<IStorageSizeProps> = memo(({ diskSpace, usedSpace }) => {
  const percent = getPercent(diskSpace, usedSpace);
  const color = getProgressColor(percent);
  const MemoIcon = memo(AiOutlineCloud);

  return (
    <div className="storage-size">
      <div className="storage-size__info">
        <MemoIcon className="icon" />
        Хранилище (заполнено на {`${percent}%`})
      </div>
      <div className="storage-size__progress-bar">
        <div
          style={{ width: `${percent}%`, backgroundColor: color }}
          className="storage-size__value"
        />
      </div>
      <div className="storage-size__size-info">
        {formatSize(usedSpace)} из {formatSize(diskSpace)}
      </div>
      <Button outline="outline" color="orange" text="Купить больше места" />
    </div>
  );
});
