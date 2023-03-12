import React, { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'hooks';
import { Portal, Backdrop, Modal } from 'components';
import './Popup.scss';

export interface IPopupProps {
  children?: React.ReactNode;
  onClose: () => void;
  height: number;
}

export const Popup: FC<IPopupProps> = ({ children, onClose, height }) => {
  const ref = useRef<null | HTMLDivElement>(null);
  useClickOutside(ref, onClose, ['click', 'contextmenu']);

  return (
    <motion.div
      ref={ref}
      initial={{ height: 0, opacity: 0, translateY: -10 }}
      animate={{ height, opacity: 1, translateY: 0 }}
      exit={{ height: 0, opacity: 0, translateY: -10 }}
      transition={{ duration: 0.1 }}
      aria-hidden
      className="popup"
    >
      {children}
      <Portal>
        <Backdrop className="popup-modal" onClose={onClose}>
          <Modal onClose={onClose}>{children}</Modal>
        </Backdrop>
      </Portal>
    </motion.div>
  );
};
