import React, { FC, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, MobileMenuModal } from 'components';
import { noAuthDesctopMenu, noAuthMobileMenu } from 'consts';
import { PathRoutes } from 'types';
import { MobileMenuItem } from './mobile-menu-item/MobileMenuItem';
import './MobileMenu.scss';

export interface IMobileMenu {
  onClose: () => void;
}

export const MobileMenu: FC<IMobileMenu> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const mobileNoAuthMenu = useMemo(() => [...noAuthDesctopMenu, ...noAuthMobileMenu], []);

  const toLogin = useCallback(() => {
    onClose();
    navigate(PathRoutes.LOGIN);
  }, [onClose]);

  const toRegister = useCallback(() => {
    onClose();
    navigate(PathRoutes.REGISTER);
  }, [onClose]);

  return (
    <MobileMenuModal onClose={onClose}>
      <ul className="mobile-menu__ul">
        {mobileNoAuthMenu.map((item) => (
          <li key={item.path}>
            <MobileMenuItem
              active={location.pathname === item.path}
              onClose={onClose}
              title={item.title}
              path={item.path}
            />
          </li>
        ))}
      </ul>
      <div className="mobile-menu__buttons">
        <Button onClick={toRegister} outline="fill" color="blue" text="Попробовать" />
        <Button onClick={toLogin} text="Войти" />
      </div>
    </MobileMenuModal>
  );
};
