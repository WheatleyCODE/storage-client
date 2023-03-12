import React, { FC, memo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CgClose } from 'react-icons/cg';
import './Modal.scss';

export interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export const Modal: FC<IModalProps> = ({ children, onClose, className }) => {
  useEffect(() => {
    const { platform } = window.navigator;

    if (platform === 'Win32') document.body.classList.add('win');
    if (platform !== 'Win32') document.body.classList.add('mac');

    return () => {
      document.body.classList.remove('win');
      document.body.classList.remove('mac');
    };
  }, []);

  const MemoIcon = memo(CgClose);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ translateY: -30, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ translateY: -30, opacity: 0 }}
      onClick={stopPropagation}
      className={`modal ${className}`}
    >
      <div aria-hidden onClick={onClose} className="modal__close-button">
        <MemoIcon />
      </div>
      {children}
    </motion.div>
  );
};
