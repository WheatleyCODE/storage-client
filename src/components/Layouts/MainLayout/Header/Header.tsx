import React, { FC, useCallback } from 'react';
import { Button } from 'components';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { MdMenu } from 'react-icons/md';
import { PathRoutes } from 'types';
import './Header.scss';
import { Menu } from '../Menu/Menu';
import { Logo } from '../Logo/Logo';

export const Header: FC = () => {
  const navigate = useNavigate();

  const navigateToLogin = useCallback(() => {
    navigate(PathRoutes.LOGIN);
  }, [navigate]);

  return (
    <header className="header">
      <div className="header__menu">
        <div className="header__burger">
          <Button type="icon" color="blue" Icon={MdMenu} />
        </div>
        <Logo />
        <Menu />
      </div>
      <div className="header__user">
        <Button onClick={navigateToLogin} color="blue" Icon={FaRegUser} text="Войти" />
      </div>
    </header>
  );
};
