import React, { FC } from 'react';
import { motion } from 'framer-motion';
import './Backdrop.scss';

export interface IBackdropProps {
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Backdrop: FC<IBackdropProps> = ({ onClose, children, className }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    aria-hidden
    onClick={onClose}
    className={`backdrop ${className || ''}`}
  >
    {children}
  </motion.div>
);
