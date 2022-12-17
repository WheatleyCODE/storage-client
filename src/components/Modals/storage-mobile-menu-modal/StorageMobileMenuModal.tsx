import React, { FC, memo } from 'react';
import { StorageSize, Portal, Backdrop, Drawer, MobileMenuModal } from 'components';
import { useTypedSelector } from 'hooks';
import { storageMenu } from 'consts';
import { StorageMobileMenuItem } from './storage-mobile-menu-item/StorageMobileMenuItem';
import './StorageMobileMenuModal.scss';

export interface IStorageMobileMenuModalProps {
  onClose: () => void;
}

export const StorageMobileMenuModal: FC<IStorageMobileMenuModalProps> = memo(({ onClose }) => {
  const { diskSpace, usedSpace } = useTypedSelector((state) => state.storage);

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Drawer open="left">
          <MobileMenuModal onClose={onClose}>
            <div className="storage-mobile-menu-modal">
              <ul className="storage-mobile-menu-modal__ul">
                {storageMenu.map(({ Icon, path, title }) => (
                  <li key={path}>
                    <StorageMobileMenuItem
                      onClose={onClose}
                      Icon={Icon}
                      title={title}
                      path={path}
                    />
                  </li>
                ))}
              </ul>
              <div className="storage-mobile-menu-modal__size">
                <StorageSize usedSpace={usedSpace} diskSpace={diskSpace} />
              </div>
            </div>
          </MobileMenuModal>
        </Drawer>
      </Backdrop>
    </Portal>
  );
});
