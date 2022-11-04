import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { Outlet } from 'react-router';
import { useActions, useTypedSelector } from 'hooks';
import { ModalsController } from 'components';
import { setAppLoader } from 'helpers';
import { getContextMenuCoords, sleep } from 'utils';
import { ICoords } from 'types';
import { StorageWorkplaceLayout } from '../storage-workplace-layout/StorageWorkplaceLayout';
import { StorageAside } from './storage-aside/StorageAside';
import { StorageLogo } from './storage-logo/StorageLogo';
import { StorageMenu } from './storage-menu/StorageMenu';
import { StorageSearch } from './storage-search/StorageSearch';
import { StorageUser } from './storage-user/StorageUser';
import './StoragePageLayout.scss';

export const StoragePageLayout: FC = () => {
  const { loading } = useTypedSelector((state) => state.storage);
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [coords, setCoords] = useState<ICoords>({});
  const { fetchStorage } = useActions();

  const asideControls = useAnimation();
  const menuControls = useAnimation();

  const openContextMenu = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (isContextMenu) {
        setIsContextMenu(false);
        await sleep(150);
      }

      setTimeout(() => {
        setCoords(getContextMenuCoords(e));
        setIsContextMenu(true);
      }, 0);
    },
    [isContextMenu]
  );

  const closeContextMenu = useCallback(() => {
    setIsContextMenu(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchStorage();

    return () => {
      document.body.style.overflow = 'auto';
    };
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

  const lockContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    closeContextMenu();
  }, []);

  useEffect(() => {
    setAppLoader(loading);
  }, [loading]);

  return (
    <div
      aria-hidden
      onClick={closeContextMenu}
      onContextMenu={lockContextMenu}
      className="storage-page-layout"
    >
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
          <StorageWorkplaceLayout
            coords={coords}
            openContextMenu={openContextMenu}
            closeContextMenu={closeContextMenu}
            isContextMenu={isContextMenu}
          >
            <Outlet />
          </StorageWorkplaceLayout>
        </div>
        <StorageAside controls={asideControls} isOpen={isOpenAside} toggleOpen={toggleAside} />
      </div>
      <ModalsController />
    </div>
  );
};
