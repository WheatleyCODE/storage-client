import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getDrawerConfig } from './drawer.config';
import './Drawer.scss';

export interface IDrawerProps {
  children: React.ReactNode;
  open: 'right' | 'left' | 'top' | 'bottom';
  width?: number;
  isFull?: boolean;
}

export const Drawer: FC<IDrawerProps> = ({ children, open, isFull = true, width = 400 }) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const { initial, exit, animate } = getDrawerConfig(open, width);

  return (
    <motion.div
      onClick={stopPropagation}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.25 }}
      exit={exit}
      className={`drawer ${open} ${isFull ? 'full' : ''}`}
    >
      {children}
    </motion.div>
  );
};
