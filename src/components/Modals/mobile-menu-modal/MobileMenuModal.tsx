import React, { FC, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { CgClose } from 'react-icons/cg';
import { Logo } from 'components';
import './MobileMenuModal.scss';

export interface IMobileMenuModal {
  children: React.ReactNode;
  onClose: () => void;
}

export const MobileMenuModal: FC<IMobileMenuModal> = ({ children, onClose }) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const MemoIcon = memo(CgClose);

  return (
    <motion.div
      onClick={stopPropagation}
      initial={{ translateX: -400, borderRadius: '0 10% 10% 0' }}
      animate={{ translateX: 0, borderRadius: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ translateX: -400, borderRadius: '0 10% 10% 0' }}
      className="mobile-menu-modal"
    >
      <div aria-hidden onClick={onClose} className="mobile-menu-modal__close">
        <MemoIcon />
      </div>
      <div className="mobile-menu-modal__logo">
        <Logo />
      </div>
      {children}
    </motion.div>
  );
};
