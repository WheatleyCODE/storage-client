import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { Portal, Backdrop, Drawer } from 'components';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { AdditionTypes } from 'types';
import { modalsActions } from 'store';
import { StorageAdditions } from '../storage-additions/StorageAdditions';
import './StorageAside.scss';

export interface IStorageAsideProps {
  isOpen: boolean;
  controls: AnimationControls;
  openAside: () => void;
  closeAside: () => void;
}

export const StorageAside: FC<IStorageAsideProps> = memo((props) => {
  const { isOpen, openAside, closeAside, controls } = props;
  const { isInfo } = useTypedSelector((state) => state.modals);
  const [active, setActive] = useState<AdditionTypes>(AdditionTypes.CALENDAR);
  const dispatch = useTypedDispatch();

  const { changeIsModal } = modalsActions;

  const closeInfo = useCallback(() => {
    dispatch(changeIsModal({ key: 'isInfo', boolean: false }));
  }, []);

  const changeActive = useCallback(
    (type: AdditionTypes) => {
      if (isInfo) closeInfo();

      if (type === active && isOpen) {
        closeAside();
        return;
      }

      if (isOpen) {
        setActive(type);
        return;
      }

      openAside();
      setActive(type);
    },
    [isOpen, openAside, closeAside, active, isInfo, closeInfo]
  );

  return (
    <div className="storage-aside">
      <motion.div
        animate={controls}
        transition={{ duration: 0.15 }}
        variants={{
          open: { width: 380 },
          close: { width: 50 },
        }}
        className="storage-aside__desctop"
      >
        <StorageAdditions
          toggleOpen={closeAside}
          active={active}
          isOpen={isOpen}
          changeActive={changeActive}
        />
      </motion.div>

      <div className="storage-aside__mobile">
        <StorageAdditions
          toggleOpen={closeAside}
          active={active}
          isOpen={false}
          changeActive={changeActive}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <Backdrop className="storage-aside" onClose={closeAside}>
              <Drawer open="right">
                <div className="storage-aside-modal">
                  <StorageAdditions
                    toggleOpen={closeAside}
                    active={active}
                    isOpen={isOpen}
                    changeActive={changeActive}
                  />
                </div>
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
});
