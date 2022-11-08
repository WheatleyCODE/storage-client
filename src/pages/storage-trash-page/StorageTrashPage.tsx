import React, { FC, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { storageActions } from 'store';
import { StorageWorkplace } from 'components';
import './StorageTrashPage.scss';

export const StorageTrashPage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const newItems = allItems.filter((item) => item.isTrash);
    dispatch(storageActions.setWorkplace(newItems));
    dispatch(storageActions.setParents([]));
  }, [allItems]);

  return (
    <div className="storage-trash-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};
