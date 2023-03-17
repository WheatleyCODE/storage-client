import React, { FC, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, useAnimation } from 'framer-motion';
import { Outlet } from 'react-router';
import { useActions, useStorageHotkeys, useTypedDispatch, useTypedSelector } from 'hooks';
import { ModalsController, AudioPlayer, Uploader } from 'components';
import { modalsActions } from 'store';
import { setAppLoader } from 'helpers';
import { getContextMenuCoords, sleep } from 'utils';
import { ICoords } from 'types';
import { StorageWorkplaceLayout } from '../storage-workplace-layout/StorageWorkplaceLayout';
import { StorageAside } from './storage-aside/StorageAside';
import { StorageLogo } from './storage-logo/StorageLogo';
import { StorageMenu } from './storage-menu/StorageMenu';
import { StorageSearch } from './storage-search/StorageSearch';
import { StorageUser } from './storage-user/StorageUser';
import { StorageInfo } from './storage-info/StorageInfo';
import './StoragePageLayout.scss';

export const StoragePageLayout: FC = () => {
  const { isLoading, isTools } = useTypedSelector((state) => state.storage);
  const { isInfo, isAside } = useTypedSelector((state) => state.modals);
  const { isOpen } = useTypedSelector((state) => state.uploader);
  const { isOpen: isOpenPlayer } = useTypedSelector((state) => state.player);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [coords, setCoords] = useState<ICoords>({});
  const { fetchStorage } = useActions();
  const dispatch = useTypedDispatch();

  const { changeIsModal } = modalsActions;

  const asideControls = useAnimation();
  const menuControls = useAnimation();

  const openContextMenu = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (isContextMenu) setIsContextMenu(false);

      await sleep(120);

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
    if (!isTools) {
      asideControls.start('close');
      return;
    }

    if (isAside) {
      asideControls.start('open');
      return;
    }

    asideControls.start('close');
  }, [isAside, asideControls, isTools]);

  useEffect(() => {
    if (isOpenMenu) {
      menuControls.start('open');
      return;
    }

    menuControls.start('close');
  }, [isOpenMenu, menuControls]);

  const openAside = useCallback(() => {
    dispatch(changeIsModal({ key: 'isAside', boolean: true }));
  }, []);

  const closeAside = useCallback(() => {
    dispatch(changeIsModal({ key: 'isAside', boolean: false }));
  }, []);

  const toggleMenu = useCallback(() => setIsOpenMenu((p) => !p), []);

  const closeInfo = useCallback(() => {
    dispatch(changeIsModal({ key: 'isInfo', boolean: false }));
  }, []);

  const lockContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    closeContextMenu();
  }, []);

  useEffect(() => {
    setAppLoader(isLoading);
  }, [isLoading]);

  const { workplaceRef } = useStorageHotkeys();

  return (
    <div
      aria-hidden
      onClick={closeContextMenu}
      onContextMenu={lockContextMenu}
      className="storage-page-layout"
      tabIndex={-2}
      ref={workplaceRef}
    >
      <div className="storage-page-layout__header">
        <div className="storage-page-layout__header-block">
          <StorageLogo controls={menuControls} isOpen={isOpenMenu} />
          <StorageSearch />
        </div>
        <StorageUser controls={asideControls} isOpen={isAside} />
      </div>

      <div className="storage-page-layout__main">
        <div className="storage-page-layout__main-block">
          <StorageMenu
            openContextMenu={openContextMenu}
            controls={menuControls}
            isOpen={isOpenMenu}
            toggleOpen={toggleMenu}
          />
          <StorageWorkplaceLayout
            coords={coords}
            openContextMenu={openContextMenu}
            closeContextMenu={closeContextMenu}
            isContextMenu={isContextMenu}
          >
            <Outlet />
          </StorageWorkplaceLayout>
        </div>

        <AnimatePresence>{isInfo && <StorageInfo onClose={closeInfo} />}</AnimatePresence>

        {isTools && (
          <StorageAside
            controls={asideControls}
            isOpen={isAside}
            openAside={openAside}
            closeAside={closeAside}
          />
        )}
      </div>
      <ModalsController />
      <AnimatePresence>
        {isOpen && <Uploader />}
        {isOpenPlayer && <AudioPlayer />}
      </AnimatePresence>
    </div>
  );
};
