import React, { FC, useEffect } from 'react';
import { useItems, useTypedDispatch, useTypedSelector } from 'hooks';
import { storageActions } from 'store';
import { StorageWorkplace } from 'components';
import './StorageTrashPage.scss';

export const StorageTrashPage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const items = useItems({ isTrash: true });
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(storageActions.setWorkplace(items));
    dispatch(storageActions.setParents([]));
  }, [allItems]);

  return (
    <div className="storage-trash-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};
