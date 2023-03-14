import React, { FC, useEffect, useState } from 'react';
import { StorageWorkplace } from 'components';
import './StorageStarredPage.scss';
import { IClientItemData } from 'types';
import { FinderService } from 'services';
import { PropertyFactory } from 'helpers';

export const StorageStarredPage: FC = () => {
  const [items, setItems] = useState<IClientItemData[]>([]);

  const staredRequest = async () => {
    const { data } = await FinderService.getStared();
    const clientData = data.map((item) => PropertyFactory.create(item));
    setItems(clientData);
  };

  useEffect(() => {
    staredRequest();
  }, []);

  return (
    <div className="storage-shared-page">
      <StorageWorkplace workplaceItems={items} />
    </div>
  );
};
