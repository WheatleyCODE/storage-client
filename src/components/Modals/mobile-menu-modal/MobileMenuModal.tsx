import React, { FC, memo } from 'react';
import { MdClose } from 'react-icons/md';
import { Logo, Button } from 'components';
import './MobileMenuModal.scss';

export interface IMobileMenuModal {
  children: React.ReactNode;
  onClose: () => void;
}

export const MobileMenuModal: FC<IMobileMenuModal> = ({ children, onClose }) => {
  return (
    <div className="mobile-menu-modal">
      <div className="mobile-menu-modal__close">
        <Button
          color="none-dark"
          radius="rounded"
          outline="fill"
          onClick={onClose}
          type="icon"
          Icon={MdClose}
        />
      </div>
      <div className="mobile-menu-modal__logo">
        <Logo />
      </div>
      {children}
    </div>
  );
};
