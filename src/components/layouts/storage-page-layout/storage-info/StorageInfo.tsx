import React, { FC, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { modalsActions } from 'store';
import { Portal, Backdrop, Drawer } from 'components';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { StorageInfoMain } from './storage-info-main/StorageInfoMain';
import './StorageInfo.scss';

export interface IStorageInfoProps {
  onClose: () => void;
}

export const StorageInfo: FC<IStorageInfoProps> = memo(({ onClose }) => {
  const { currentItems } = useTypedSelector((state) => state.storage);
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();

  const item = currentItems[0];

  const openChangeAccess = useCallback(() => {
    dispatch(modalsActions.changeIsModal({ key: 'isChangeAccess', boolean: true }));
  }, []);

  const openChangeAccessModal = useCallback(() => {
    dispatch(modalsActions.changeIsModal({ key: 'isChangeAccess', boolean: true }));
    dispatch(modalsActions.changeIsModal({ key: 'isInfo', boolean: false }));
  }, []);

  return (
    <motion.div
      transition={{ duration: 0.15 }}
      initial={{ width: 0, opacity: 1 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 1 }}
      className="storage-info"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="storage-info__header" />

      <StorageInfoMain
        item={item}
        onClose={onClose}
        openChangeAccessModal={openChangeAccess}
        userId={user.id}
      />

      <Portal>
        <Backdrop className="is-info-modal" onClose={onClose}>
          <Drawer width={320} open="right">
            <StorageInfoMain
              item={item}
              onClose={onClose}
              openChangeAccessModal={openChangeAccessModal}
              userId={user.id}
            />
          </Drawer>
        </Backdrop>
      </Portal>
    </motion.div>
  );
});
