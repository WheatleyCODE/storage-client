import React, { FC, useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StorageSorter, StoragePath, StorageLast, ContextMenu, Portal } from 'components';
import { useClickOutside } from 'hooks';
import { getContextMenuCoords, sleep } from 'utils';
import { ICoords } from 'types';
import './StorageWorkplaceLayout.scss';

export interface IStorageWorkplaceLayoutProps {
  children: React.ReactNode;
}

export const StorageWorkplaceLayout: FC<IStorageWorkplaceLayoutProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<ICoords>({});
  const ref = useRef<null | HTMLDivElement>(null);

  const openContextMenu = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (show) {
        setShow(false);
        await sleep(120);
      }

      setTimeout(() => {
        setCoords(getContextMenuCoords(e));
        setShow(true);
      }, 0);
    },
    [show]
  );

  const closeContextMenu = useCallback(() => setShow(false), []);
  useClickOutside(ref, closeContextMenu, ['click', 'contextmenu']);

  return (
    <div className="storage-workplace-layout">
      <div className="storage-workplace-layout__storage-path-visual right" />
      <div className="storage-workplace-layout__storage-path-visual left" />
      <StoragePath />
      <div onContextMenu={openContextMenu} className="storage-workplace-layout__content">
        <StorageLast />
        <StorageSorter />
        {children}
      </div>

      <AnimatePresence>
        {show && (
          <Portal>
            <div ref={ref}>
              <ContextMenu onClose={closeContextMenu} coords={coords} />
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};
