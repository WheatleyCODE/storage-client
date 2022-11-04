import React, { FC, useEffect } from 'react';
import { storageActions } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { StorageWorkplace } from 'components';
import './StorageMyDrivePage.scss';

export const StorageMyDrivePage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const newItems = allItems.filter((item) => !item.isTrash);
    dispatch(storageActions.setWorkplace(newItems));
  }, [allItems]);

  return (
    <div className="storage-my-drive-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};