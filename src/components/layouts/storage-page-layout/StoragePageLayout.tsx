import { useAnimation } from 'framer-motion';
import { useActions } from 'hooks';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { StorageDashboardLayout } from '../storage-dashboard-layout/StorageDashboardLayout';
import { StorageAside } from './storage-aside/StorageAside';
import { StorageLogo } from './storage-logo/StorageLogo';
import { StorageMenu } from './storage-menu/StorageMenu';
import { StorageSearch } from './storage-search/StorageSearch';
import { StorageUser } from './storage-user/StorageUser';
import './StoragePageLayout.scss';

export const StoragePageLayout: FC = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const { fetchStorage } = useActions();

  const asideControls = useAnimation();
  const menuControls = useAnimation();

  useEffect(() => {
    fetchStorage();
  }, []);

  useEffect(() => {
    if (isOpenAside) {
      asideControls.start('open');
      return;
    }

    asideControls.start('close');
  }, [isOpenAside, asideControls]);

  useEffect(() => {
    if (isOpenMenu) {
      menuControls.start('open');
      return;
    }

    menuControls.start('close');
  }, [isOpenMenu, menuControls]);

  const toggleAside = useCallback(() => setIsOpenAside((p) => !p), []);
  const toggleMenu = useCallback(() => setIsOpenMenu((p) => !p), []);
  const lockContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault(),
    []
  );

  return (
    <div onContextMenu={lockContextMenu} className="storage-page-layout">
      <div className="storage-page-layout__header">
        <div className="storage-page-layout__header-block">
          <StorageLogo controls={menuControls} isOpen={isOpenMenu} />
          <StorageSearch />
        </div>
        <StorageUser controls={asideControls} isOpen={isOpenAside} />
      </div>

      <div className="storage-page-layout__main">
        <div className="storage-page-layout__main-block">
          <StorageMenu controls={menuControls} isOpen={isOpenMenu} toggleOpen={toggleMenu} />
          <StorageDashboardLayout>
            <Outlet />
          </StorageDashboardLayout>
        </div>
        <StorageAside controls={asideControls} isOpen={isOpenAside} toggleOpen={toggleAside} />
      </div>
    </div>
  );
};
