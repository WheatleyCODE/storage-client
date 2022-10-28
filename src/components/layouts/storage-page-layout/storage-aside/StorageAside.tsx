import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { Portal, Backdrop, Drawer } from 'components';
import { AdditionTypes } from 'types';
import { StorageAdditions } from '../storage-additions/StorageAdditions';
import './StorageAside.scss';

export interface IStorageAsideProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageAside: FC<IStorageAsideProps> = memo(({ isOpen, toggleOpen, controls }) => {
  const [active, setActive] = useState<AdditionTypes>(AdditionTypes.CALENDAR);

  const changeActive = useCallback(
    (type: AdditionTypes) => {
      if (type === active) {
        toggleOpen();
        return;
      }

      if (isOpen) {
        setActive(type);
        return;
      }

      toggleOpen();
      setActive(type);
    },
    [isOpen, toggleOpen, active]
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
          toggleOpen={toggleOpen}
          active={active}
          isOpen={isOpen}
          changeActive={changeActive}
        />
      </motion.div>

      <div className="storage-aside__mobile">
        <StorageAdditions
          toggleOpen={toggleOpen}
          active={active}
          isOpen={false}
          changeActive={changeActive}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <Backdrop className="storage-aside" onClose={toggleOpen}>
              <Drawer open="right">
                <div className="storage-aside-modal">
                  <StorageAdditions
                    toggleOpen={toggleOpen}
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
