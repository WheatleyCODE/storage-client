import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import './MobileMenuModal.scss';

export interface IMobileMenuModal {
  children: React.ReactNode;
}

export const MobileMenuModal: FC<IMobileMenuModal> = ({ children }) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      onClick={stopPropagation}
      initial={{ translateX: -400, borderRadius: '0 10% 10% 0' }}
      animate={{ translateX: 0, borderRadius: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ translateX: -400, borderRadius: '0 10% 10% 0' }}
      className="mobile-menu-modal"
    >
      {children}
    </motion.div>
  );
};
