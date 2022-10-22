import { useAnimation } from 'framer-motion';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { StorageDashboardLayout } from '../storage-dashboard-layout/StorageDashboardLayout';
import { StorageAside } from './storage-aside/StorageAside';
import { StorageLogo } from './storage-logo/StorageLogo';
import { StorageMenu } from './storage-menu/StorageMenu';
import { StorageSearch } from './storage-search/StorageSearch';
import { StorageUser } from './storage-user/StorageUser';
import './StorageLayout.scss';

export const StorageLayout: FC = () => {
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(true);

  const asideControls = useAnimation();
  const menuControls = useAnimation();

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

  return (
    <div className="storage-layout">
      <div className="storage-layout__header">
        <div className="storage-layout__header-block">
          <StorageLogo controls={menuControls} isOpen={isOpenMenu} toggleOpen={toggleMenu} />
          <StorageSearch />
        </div>
        <StorageUser controls={asideControls} isOpen={isOpenAside} toggleOpen={toggleAside} />
      </div>
      <div className="storage-layout__main">
        <div className="storage-layout__main-block">
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
