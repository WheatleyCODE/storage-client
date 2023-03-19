/* eslint-disable consistent-return */
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Backdrop.scss';

export interface IBackdropProps {
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  isDark?: boolean;
}

export const Backdrop: FC<IBackdropProps> = ({ onClose, children, className, isDark }) => {
  const refDiv = useRef<HTMLDivElement | null>(null);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }, []);

  useEffect(() => {
    const { current } = refDiv;
    if (!current) return;

    current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': {
          onClose();
          break;
        }

        default:
          break;
      }
    };

    current.addEventListener('keydown', handleKeyDown);

    return () => {
      current.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      tabIndex={-3}
      ref={refDiv}
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
