import React, { FC, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StorageSorter, StoragePath, StorageLast, ContextMenu, Portal } from 'components';
import { useTypedSelector } from 'hooks';
import { ICoords } from 'types';
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
  const { lastItems } = useTypedSelector((state) => state.storage);
  const ref = useRef<null | HTMLDivElement>(null);

  return (
    <div aria-hidden onClick={closeContextMenu} className="storage-workplace-layout">
      <div className="storage-workplace-layout__storage-path-visual right" />
      <div className="storage-workplace-layout__storage-path-visual left" />
      <StoragePath />
      <div onContextMenu={openContextMenu} className="storage-workplace-layout__content">
        <StorageLast lastItems={lastItems} />
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
