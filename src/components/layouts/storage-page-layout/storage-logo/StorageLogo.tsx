import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { MdMenu } from 'react-icons/md';
import { Portal, Backdrop, Button, Logo, Drawer, MobileMenuLayout } from 'components';
import { StorageMobileMenu } from '../storage-mobile-menu/StorageMobileMenu';
import './StorageLogo.scss';

export interface IStorageLogoProps {
  isOpen: boolean;
  controls: AnimationControls;
}

export const StorageLogo: FC<IStorageLogoProps> = memo(({ isOpen, controls }) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = useCallback(() => setShowMenu(false), []);
  const openMenu = useCallback(() => setShowMenu(true), []);

  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.15 }}
      variants={{
        open: { width: 260 },
        close: { width: 70 },
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

      <AnimatePresence>
        {showMenu && (
          <Portal>
            <Backdrop onClose={closeMenu}>
              <Drawer open="left">
                <MobileMenuLayout onClose={closeMenu}>
                  <StorageMobileMenu onClose={closeMenu} />
                </MobileMenuLayout>
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
