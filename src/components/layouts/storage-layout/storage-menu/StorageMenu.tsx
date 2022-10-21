import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'components';
import { storageMenu } from 'consts';
import { StorageMenuItem } from './storage-menu-item/StorageMenuItem';
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
      <Button
        className={`storage-menu__create-button ${isOpen ? 'open' : ''}`}
        Icon={FaPlus}
        radius="rounded"
        color="blue"
        text={isOpen ? 'Cоздать' : undefined}
      />

      {storageMenu.map(({ title, path, Icon }) => (
        <StorageMenuItem isOpen={isOpen} title={title} path={path} Icon={Icon} />
      ))}
    </motion.div>
  );
});
