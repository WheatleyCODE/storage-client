import React, { FC, memo } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdHorizontalRule } from 'react-icons/md';
import { Button, StorageSize } from 'components';
import { storageMenu } from 'consts';
import { StorageMenuItem } from './storage-menu-item/StorageMenuItem';
import './StorageMenu.scss';

export interface IStorageMenuProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageMenu: FC<IStorageMenuProps> = memo(({ isOpen, controls, toggleOpen }) => {
  const openClassName = isOpen ? 'open' : '';

  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.15 }}
      variants={{
        open: { width: 270 },
        close: { width: 80 },
      }}
      className="storage-menu"
    >
      <Button
        className={`storage-menu__create-button ${openClassName}`}
        Icon={AiOutlinePlus}
        radius="rounded"
        color="blue"
        text={isOpen ? 'Cоздать' : undefined}
      />

      {storageMenu.map(({ title, path, Icon }) => (
        <StorageMenuItem key={path} isOpen={isOpen} title={title} path={path} Icon={Icon} />
      ))}

      <div className="storage-menu__toggle-button">
        <Button
          className={`storage-menu__toggle ${openClassName}`}
          onClick={toggleOpen}
          Icon={MdHorizontalRule}
          type="icon"
        />
      </div>

      {isOpen && (
        <div className="storage-menu__size">
          <StorageSize diskSpace={1024} usedSpace={900} />
        </div>
      )}
    </motion.div>
  );
});
