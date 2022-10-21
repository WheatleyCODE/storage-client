import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import './StorageAside.scss';

export interface IStorageAsideProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageAside: FC<IStorageAsideProps> = memo(({ isOpen, toggleOpen, controls }) => {
  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.15 }}
      variants={{
        open: { width: 200 },
        close: { width: 50 },
      }}
      onClick={toggleOpen}
      className="storage-aside"
    >
      <div>aside</div>
    </motion.div>
  );
});
