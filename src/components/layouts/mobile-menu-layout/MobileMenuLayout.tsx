import React, { FC, memo } from 'react';
import { CgClose } from 'react-icons/cg';
import { Logo } from 'components';
import './MobileMenuLayout.scss';

export interface IMobileMenuLayout {
  children: React.ReactNode;
  onClose: () => void;
}

export const MobileMenuLayout: FC<IMobileMenuLayout> = ({ children, onClose }) => {
  const MemoIcon = memo(CgClose);

  return (
    <div className="mobile-menu-layout">
      <div aria-hidden onClick={onClose} className="mobile-menu-layout__close">
        <MemoIcon />
      </div>
      <div className="mobile-menu-layout__logo">
        <Logo />
      </div>
      {children}
    </div>
  );
};
