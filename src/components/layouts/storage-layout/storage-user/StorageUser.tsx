import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import './StorageUser.scss';

export interface IStorageUserProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageUser: FC<IStorageUserProps> = memo(({ isOpen, toggleOpen, controls }) => {
  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.15 }}
      variants={{
        open: { width: 200 },
        close: { width: 50 },
      }}
      onClick={toggleOpen}
      className="storage-user "
    >
      <div>user</div>
    </motion.div>
  );
});
