import React, { FC } from 'react';
import { MobileMenuModal } from 'components';
import './StorageMobileMenu.scss';

export interface IStorageMobileMenuProps {
  onClose: () => void;
}

export const StorageMobileMenu: FC<IStorageMobileMenuProps> = () => {
  return (
    <MobileMenuModal>
      <h1>Hello</h1>
    </MobileMenuModal>
  );
};
