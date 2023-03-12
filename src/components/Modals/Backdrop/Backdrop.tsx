import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Backdrop.scss';

export interface IBackdropProps {
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  isDark?: boolean;
}

export const Backdrop: FC<IBackdropProps> = ({ onClose, children, className, isDark }) => {
  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      aria-hidden
      onClick={onClick}
      onContextMenu={onClick}
      className={`backdrop ${isDark ? 'dark' : ''} ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};
