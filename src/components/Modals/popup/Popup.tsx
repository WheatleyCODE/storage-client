import React, { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'hooks';
import './Popup.scss';

export interface IPopupProps {
  children?: React.ReactNode;
  onClose: () => void;
  height: number;
}

export const Popup: FC<IPopupProps> = ({ children, onClose, height }) => {
  const ref = useRef<null | HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  return (
    <motion.div
      ref={ref}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden
      className="popup"
    >
      {children}
    </motion.div>
  );
};
