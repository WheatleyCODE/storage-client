import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdMenu } from 'react-icons/md';
import { Button, Logo, User, MainMobileMenuModal } from 'components';
import { Menu } from '../menu/Menu';
import './Header.scss';

export const Header: FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = useCallback(() => setShowMenu(false), []);
  const openMenu = useCallback(() => setShowMenu(true), []);

  return (
    <header className="header">
      <div className="header__menu">
        <div className="header__burger">
          <Button color="none-dark" outline="fill" onClick={openMenu} type="icon" Icon={MdMenu} />
        </div>
        <Logo />
        <Menu />
      </div>
      <div className="header__user">
        <User />
      </div>

      <AnimatePresence>{showMenu && <MainMobileMenuModal onClose={closeMenu} />}</AnimatePresence>
    </header>
  );
};
