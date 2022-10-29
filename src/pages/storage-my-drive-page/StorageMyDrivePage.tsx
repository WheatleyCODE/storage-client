import { StorageWorkplace } from 'components';
import { useTypedSelector } from 'hooks';
import React, { FC, useMemo } from 'react';
import './StorageMyDrivePage.scss';

export const StorageMyDrivePage: FC = () => {
  const { albums, files, folders, tracks } = useTypedSelector((state) => state.storage);

  const items = useMemo(
    () => [...folders, ...files, ...albums, ...tracks],
    [albums, files, folders, tracks]
  );

  return (
    <div className="storage-my-drive-page">
      <StorageWorkplace items={items} />
    </div>
  );
};
