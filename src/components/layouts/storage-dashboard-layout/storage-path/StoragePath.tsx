import React, { FC, memo } from 'react';
import './StoragePath.scss';

export const StoragePath: FC = memo(() => {
  return (
    <div className="storage-path">
      <div>{'Хранилище > Папка'}</div>
    </div>
  );
});
