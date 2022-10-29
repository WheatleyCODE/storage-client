import React, { FC, memo } from 'react';
import { StorageSize } from 'components';
import { useTypedSelector } from 'hooks';
import { storageMenu } from 'consts';
import { StorageMobileMenuItem } from './storage-mobile-menu-item/StorageMobileMenuItem';
import './StorageMobileMenu.scss';

export interface IStorageMobileMenuProps {
  onClose: () => void;
}

export const StorageMobileMenu: FC<IStorageMobileMenuProps> = memo(({ onClose }) => {
  const { diskSpace, usedSpace } = useTypedSelector((state) => state.storage);

  return (
    <div className="storage-mobile-menu">
      <ul className="storage-mobile-menu__ul">
        {storageMenu.map(({ Icon, path, title }) => (
          <li key={path}>
            <StorageMobileMenuItem onClose={onClose} Icon={Icon} title={title} path={path} />
          </li>
        ))}
      </ul>
      <div className="storage-mobile-menu__size">
        <StorageSize usedSpace={usedSpace} diskSpace={diskSpace} />
      </div>
    </div>
  );
});
