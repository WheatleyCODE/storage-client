import React, { FC, memo, useCallback } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdHorizontalRule } from 'react-icons/md';
import { Button, StorageSize } from 'components';
import { storageActions } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { storageMenu } from 'consts';
import { StorageMenuItem } from './storage-menu-item/StorageMenuItem';
import './StorageMenu.scss';

export interface IStorageMenuProps {
  openContextMenu: (e: React.MouseEvent<any>) => Promise<void>;
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageMenu: FC<IStorageMenuProps> = memo((props) => {
  const { isOpen, controls, toggleOpen, openContextMenu } = props;

  const { diskSpace, usedSpace } = useTypedSelector((state) => state.storage);
  const dispatch = useTypedDispatch();
  const openClassName = isOpen ? 'open' : '';

  const clearCurrentItems = useCallback(() => {
    dispatch(storageActions.setCurrent([]));
  }, []);

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
        onClick={openContextMenu}
        text={isOpen ? 'Создать' : undefined}
      />

      {storageMenu.map(({ title, path, Icon }) => (
        <StorageMenuItem
          onClick={clearCurrentItems}
          key={path}
          isOpen={isOpen}
          title={title}
          path={path}
          Icon={Icon}
        />
      ))}

      <div className="storage-menu__toggle-button">
        <Button
          color="none-dark"
          outline="fill"
          className={`storage-menu__toggle ${openClassName}`}
          onClick={toggleOpen}
          Icon={MdHorizontalRule}
          type="icon"
        />
      </div>

      {isOpen && (
        <div className="storage-menu__size">
          <StorageSize diskSpace={diskSpace} usedSpace={usedSpace} />
        </div>
      )}
    </motion.div>
  );
});
