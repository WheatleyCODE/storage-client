import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdMenu } from 'react-icons/md';
import { Button, Portal, Backdrop, Logo } from 'components';
import { Menu } from '../menu/Menu';
import { User } from '../user/User';
import { MobileMenu } from '../mobile-menu/MobileMenu';
import './Header.scss';

export const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = useCallback(() => setShowMenu(false), []);
  const openMenu = useCallback(() => setShowMenu(true), []);

  return (
    <header className="header">
      <div className="header__menu">
        <div className="header__burger">
          <Button onClick={openMenu} type="icon" color="blue" Icon={MdMenu} />
        </div>
        <Logo />
        <Menu />
      </div>
      <div className="header__user">
        <User />
      </div>

      <AnimatePresence>
        {showMenu && (
          <Portal>
            <Backdrop onClose={closeMenu}>
              <MobileMenu onClose={closeMenu} />
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </header>
  );
};