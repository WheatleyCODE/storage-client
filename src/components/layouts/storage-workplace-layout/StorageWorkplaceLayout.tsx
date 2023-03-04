import React, { FC, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import { StorageSorter, StoragePath, StorageLast, ContextMenu, Portal } from 'components';
import { useItems, useTypedSelector } from 'hooks';
import { PropertyFactory } from 'helpers';
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
  const { parents, settings } = useTypedSelector((state) => state.storage);
  const ref = useRef<null | HTMLDivElement>(null);
  const items = useItems({ sortByDate: true, isParent: true });
  const lastItemsData = items.map((item) => PropertyFactory.create(item));

  const isLast = PathRoutes.STORAGE_MY_DRIVE === pathname && settings.isRecommend;

  return (
    <div aria-hidden onClick={closeContextMenu} className="storage-workplace-layout">
      <div className="storage-workplace-layout__storage-path-visual right" />
      <div className="storage-workplace-layout__storage-path-visual left" />
      <StoragePath parents={parents} />

      <div onContextMenu={openContextMenu} className="storage-workplace-layout__content">
        {isLast && <StorageLast lastItemsData={lastItemsData} />}
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
