import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaRegUser } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { Button, Portal, Backdrop } from 'components';
import { PathRoutes } from 'types';
import { useNavigate } from 'react-router';
import { useActions, useTypedSelector } from 'hooks';
import { Menu } from '../menu/Menu';
import { Logo } from '../logo/Logo';
import { MobileMenu } from '../mobile-menu/MobileMenu';
import './Header.scss';

export const Header: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = useCallback(() => setShowMenu(false), []);
  const openMenu = useCallback(() => setShowMenu(true), []);

  const navigateToLogin = useCallback(() => {
    navigate(PathRoutes.LOGIN);
  }, [navigate]);

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
        {isAuth ? (
          <Button onClick={() => logout()} color="blue" Icon={FaRegUser} text="Выйти" />
        ) : (
          <Button onClick={navigateToLogin} color="blue" Icon={FaRegUser} text="Войти" />
        )}
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
