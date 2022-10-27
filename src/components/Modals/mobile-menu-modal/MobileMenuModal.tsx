import React, { FC, memo } from 'react';
import { CgClose } from 'react-icons/cg';
import { Logo, Drawer } from 'components';
import './MobileMenuModal.scss';

export interface IMobileMenuModal {
  children: React.ReactNode;
  onClose: () => void;
}

export const MobileMenuModal: FC<IMobileMenuModal> = ({ children, onClose }) => {
  const MemoIcon = memo(CgClose);

  return (
    <Drawer open="left">
      <div aria-hidden onClick={onClose} className="mobile-menu-modal__close">
        <MemoIcon />
      </div>
      <div className="mobile-menu-modal__logo">
        <Logo />
      </div>
      {children}
    </Drawer>
  );
};
