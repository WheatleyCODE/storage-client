import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { User } from 'components';
import './StorageUser.scss';

export interface IStorageUserProps {
  isOpen: boolean;
  controls: AnimationControls;
}

export const StorageUser: FC<IStorageUserProps> = memo(({ isOpen, controls }) => {
  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.1 }}
      variants={{
        open: { width: 380 },
        close: { width: 50 },
      }}
      className={`storage-user ${isOpen ? 'open' : ''}`}
    >
      <User />
    </motion.div>
  );
});
