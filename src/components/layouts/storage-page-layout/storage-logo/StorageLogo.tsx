import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { MdMenu } from 'react-icons/md';
import { Button, Logo, StorageMobileMenuModal } from 'components';
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
        <Button color="none-dark" outline="fill" onClick={openMenu} type="icon" Icon={MdMenu} />
      </div>
      <div className="storage-logo__mobile-logo">
        <Logo />
      </div>
      <div className="storage-logo__desctop-logo">
        <Logo isName={isOpen} />
      </div>

      <AnimatePresence>
        {showMenu && <StorageMobileMenuModal onClose={closeMenu} />}
      </AnimatePresence>
    </motion.div>
  );
});
