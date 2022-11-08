import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Backdrop.scss';

export interface IBackdropProps {
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Backdrop: FC<IBackdropProps> = ({ onClose, children, className }) => {
  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden
      onClick={onClick}
      className={`backdrop ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};
