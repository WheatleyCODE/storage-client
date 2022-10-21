import React, { FC } from 'react';
import { StorageSorter, StoragePath, StorageLast } from 'components';
import './StorageDashboardLayout.scss';

export interface IStorageDashboardLayoutProps {
  children: React.ReactNode;
}

export const StorageDashboardLayout: FC<IStorageDashboardLayoutProps> = ({ children }) => {
  return (
    <div onContextMenu={() => console.log('first')} className="storage-dashboard-layout">
      <StoragePath />
      <div className="storage-dashboard-layout__content">
        <StorageLast />
        <StorageSorter />
        {children}
      </div>
    </div>
  );
};
