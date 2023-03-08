import React, { FC, useEffect } from 'react';
import { storageActions } from 'store';
import { useItems, useTypedDispatch, useTypedSelector } from 'hooks';
import { StorageWorkplace } from 'components';
import { PropertyFactory } from 'helpers';
import './StorageMyDrivePage.scss';

export const StorageMyDrivePage: FC = () => {
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);
  const items = useItems({ isTrash: false, isParent: false });
  const dispatch = useTypedDispatch();

  const workplaceData = workplaceItems.map((item) => PropertyFactory.create(item));

  useEffect(() => {
    dispatch(storageActions.setWorkplace(items));
    dispatch(storageActions.setParents([]));
  }, [allItems]);

  return (
    <div className="storage-my-drive-page">
      <StorageWorkplace workplaceItems={workplaceData} />
    </div>
  );
};
