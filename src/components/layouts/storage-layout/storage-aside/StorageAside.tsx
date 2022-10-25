import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { StorageAdditions } from '../storage-additions/StorageAdditions';
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
        open: { width: 300 },
        close: { width: 70 },
      }}
      className="storage-aside"
    >
      <StorageAdditions controls={controls} isOpen={isOpen} toggleOpen={toggleOpen} />
    </motion.div>
  );
});
