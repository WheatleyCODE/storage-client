import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import './StorageMenu.scss';

export interface IStorageMenuProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageMenu: FC<IStorageMenuProps> = memo(({ isOpen, controls, toggleOpen }) => {
  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.15 }}
      variants={{
        open: { width: 250 },
        close: { width: 60 },
      }}
      onClick={toggleOpen}
      className="storage-menu"
    >
      <div>menu</div>
    </motion.div>
  );
});
