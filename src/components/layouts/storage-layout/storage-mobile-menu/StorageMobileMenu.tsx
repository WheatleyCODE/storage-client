import React, { FC, memo } from 'react';
import { MobileMenuModal, StorageSize } from 'components';
import './StorageMobileMenu.scss';
import { storageMenu } from 'consts';
import { StorageMobileMenuItem } from './storage-mobile-menu-item/StorageMobileMenuItem';

export interface IStorageMobileMenuProps {
  onClose: () => void;
}

export const StorageMobileMenu: FC<IStorageMobileMenuProps> = memo(({ onClose }) => {
  return (
    <MobileMenuModal onClose={onClose}>
      <div className="storage-mobile-menu">
        <ul className="storage-mobile-menu__ul">
          {storageMenu.map(({ Icon, path, title }) => (
            <li key={path}>
              <StorageMobileMenuItem onClose={onClose} Icon={Icon} title={title} path={path} />
            </li>
          ))}
        </ul>
        <div className="storage-mobile-menu__size">
          <StorageSize usedSpace={900} diskSpace={1024} />
        </div>
      </div>
    </MobileMenuModal>
  );
});