import React, { FC, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CgClose } from 'react-icons/cg';
import { FcSafe } from 'react-icons/fc';
import { modalsActions } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import { ItemInfo } from './item-info/ItemInfo';
import { DriveInfo } from './drive-info/DriveInfo';
import './StorageInfo.scss';

export interface IStorageInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageInfo: FC<IStorageInfoProps> = memo(({ isOpen, onClose }) => {
  const { currentItems } = useTypedSelector((state) => state.storage);
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();
  const MemoClose = memo(CgClose);

  const item = currentItems[0];
  const MemoWPIcon = item ? memo(getWorkplaceIcon(item)) : memo(FcSafe);

  const openChangeAccessModal = useCallback(() => {
    dispatch(modalsActions.changeIsModal({ key: 'isChangeAccess', boolean: true }));
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
      <div className="storage-info__main">
        <div aria-hidden onClick={onClose} className="storage-info__close-button">
          <MemoClose />
        </div>

        <div className="storage-info__head">
          <div className={`storage-info__icon ${item && getColorClassName(item)}`}>
            <MemoWPIcon />
          </div>
          {item && <div className="storage-info__name">{item.name}</div>}
          {!item && <div className="storage-info__name">Хранилище</div>}
        </div>

        {item && (
          <ItemInfo openChangeAccessModal={openChangeAccessModal} item={item} userId={user.id} />
        )}
        {!item && <DriveInfo />}
      </div>
    </motion.div>
  );
});
