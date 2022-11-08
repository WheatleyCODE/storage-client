import React, { FC, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { StorageWorkplace } from 'components';
import { storageActions } from 'store';
import { AccessTypes } from 'types';
import './StorageSharedPage.scss';

export const StorageSharedPage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const newItems = allItems.filter(
      (item) =>
        (item.accessType === AccessTypes.PUBLIC || item.accessType === AccessTypes.LINK) &&
        !item.isTrash
    );
    dispatch(storageActions.setWorkplace(newItems));
    dispatch(storageActions.setParents([]));
  }, [allItems]);

  return (
    <div className="storage-shared-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};
