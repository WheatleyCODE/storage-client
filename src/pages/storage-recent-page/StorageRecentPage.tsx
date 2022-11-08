import React, { FC, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { storageActions } from 'store';
import { StorageWorkplace } from 'components';
import './StorageRecentPage.scss';

export const StorageRecentPage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const newItems = [...allItems].sort((a, b) => b.openDate - a.openDate);
    dispatch(storageActions.setWorkplace(newItems));
    dispatch(storageActions.setParents([]));
  }, [allItems]);

  return (
    <div className="storage-recent-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};
