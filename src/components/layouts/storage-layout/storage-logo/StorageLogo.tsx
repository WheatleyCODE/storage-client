import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { MdMenu } from 'react-icons/md';
import { Portal, Backdrop, Button, Logo } from 'components';
import { StorageMobileMenu } from '../storage-mobile-menu/StorageMobileMenu';
import './StorageLogo.scss';

export interface IStorageLogoProps {
  isOpen: boolean;
  controls: AnimationControls;
  toggleOpen: () => void;
}

export const StorageLogo: FC<IStorageLogoProps> = memo(({ isOpen, controls, toggleOpen }) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = useCallback(() => setShowMenu(false), []);
  const openMenu = useCallback(() => setShowMenu(true), []);

  return (
    <>
      <motion.div
        animate={controls}
        transition={{ duration: 0.15 }}
        variants={{
          open: { width: 250 },
          close: { width: 60 },
        }}
        className="storage-logo"
      >
        <div className="storage-logo__menu">
          <Button onClick={openMenu} type="icon" color="blue" Icon={MdMenu} />
        </div>
        <div className="storage-logo__mobile-logo">
          <Logo />
        </div>
        <div className="storage-logo__desctop-logo">
          <Logo isName={isOpen} />
        </div>
      </motion.div>
      <AnimatePresence>
        {showMenu && (
          <Portal>
            <Backdrop onClose={closeMenu}>
              <StorageMobileMenu onClose={closeMenu} />
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
});
