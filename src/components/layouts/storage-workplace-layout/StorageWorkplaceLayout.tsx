import React, { FC, useMemo, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import { StorageSorter, StoragePath, StorageLast, ContextMenu, Portal } from 'components';
import { useTypedSelector } from 'hooks';
import { ICoords, PathRoutes } from 'types';
import './StorageWorkplaceLayout.scss';

export interface IStorageWorkplaceLayoutProps {
  children: React.ReactNode;
  isContextMenu: boolean;
  closeContextMenu: () => void;
  openContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  coords: ICoords;
}

export const StorageWorkplaceLayout: FC<IStorageWorkplaceLayoutProps> = (props) => {
  const { children, isContextMenu, coords, openContextMenu, closeContextMenu } = props;
  const { pathname } = useLocation();
  const { allItems, parents } = useTypedSelector((state) => state.storage);
  const ref = useRef<null | HTMLDivElement>(null);

  const lastItems = useMemo(
    () =>
      allItems
        .filter((item) => !item.isTrash)
        .sort((a, b) => a.openDate - b.openDate)
        .splice(0),
    [allItems]
  );

  return (
    <div aria-hidden onClick={closeContextMenu} className="storage-workplace-layout">
      <div className="storage-workplace-layout__storage-path-visual right" />
      <div className="storage-workplace-layout__storage-path-visual left" />
      <StoragePath parents={parents} />

      <div onContextMenu={openContextMenu} className="storage-workplace-layout__content">
        {PathRoutes.STORAGE_MY_DRIVE === pathname && <StorageLast lastItems={lastItems} />}
        <StorageSorter />
        {children}
      </div>

      <AnimatePresence>
        {isContextMenu && (
          <Portal>
            <div aria-hidden onClick={(e) => e.stopPropagation()} ref={ref}>
              <ContextMenu onClose={closeContextMenu} coords={coords} />
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};
