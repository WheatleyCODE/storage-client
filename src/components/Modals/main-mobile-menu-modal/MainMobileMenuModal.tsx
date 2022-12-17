import React, { FC, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, Portal, Backdrop, Drawer, MobileMenuModal } from 'components';
import { noAuthDesctopMenu, noAuthMobileMenu } from 'consts';
import { PathRoutes } from 'types';
import { MobileMenuItem } from './mobile-menu-item/MobileMenuItem';
import './MainMobileMenuModal.scss';

export interface IMainMobileMenuModal {
  onClose: () => void;
}

export const MainMobileMenuModal: FC<IMainMobileMenuModal> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const mobileNoAuthMenu = useMemo(() => [...noAuthDesctopMenu, ...noAuthMobileMenu], []);

  const toLogin = useCallback(() => {
    onClose();
    navigate(PathRoutes.LOGIN);
  }, [navigate, onClose]);

  const toRegister = useCallback(() => {
    onClose();
    navigate(PathRoutes.REGISTER);
  }, [navigate, onClose]);

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Drawer open="left">
          <MobileMenuModal onClose={onClose}>
            <div className="main-mobile-menu-modal">
              <ul className="main-mobile-menu-modal__ul">
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
              <div className="main-mobile-menu-modal__buttons">
                <Button onClick={toRegister} outline="fill" color="blue" text="Попробовать" />
                <Button onClick={toLogin} text="Войти" />
              </div>
            </div>
          </MobileMenuModal>
        </Drawer>
      </Backdrop>
    </Portal>
  );
};
