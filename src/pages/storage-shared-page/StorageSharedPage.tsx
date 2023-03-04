import React, { FC, useEffect } from 'react';
import { useItems, useTypedDispatch, useTypedSelector } from 'hooks';
import { StorageWorkplace } from 'components';
import { storageActions } from 'store';
import { AccessTypes } from 'types';
import './StorageSharedPage.scss';

export const StorageSharedPage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const items = useItems({ onlyAccess: [AccessTypes.LINK, AccessTypes.PUBLIC] });
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(storageActions.setWorkplace(items));
    dispatch(storageActions.setParents([]));
  }, [allItems]);

  return (
    <div className="storage-shared-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};
