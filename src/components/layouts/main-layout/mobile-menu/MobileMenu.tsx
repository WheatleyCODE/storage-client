import React, { FC, memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { FaTimes } from 'react-icons/fa';
import { Button } from 'components';
import { headerMenu, mobileMenu } from 'consts';
import { PathRoutes } from 'types';
import { MobileMenuItem } from './mobile-menu-item/MobileMenuItem';
import { Logo } from '../logo/Logo';
import './MobileMenu.scss';

export interface IMobileMenu {
  onClose: () => void;
}

export const MobileMenu: FC<IMobileMenu> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const mobileNoAuthMenu = useMemo(() => [...headerMenu, ...mobileMenu], []);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const toLogin = useCallback(() => {
    onClose();
    navigate(PathRoutes.LOGIN);
  }, [onClose]);

  const toRegister = useCallback(() => {
    onClose();
    navigate(PathRoutes.REGISTER);
  }, [onClose]);

  const MemoIcon = memo(FaTimes);

  return (
    <motion.div
      onClick={stopPropagation}
      initial={{ translateX: -400, borderRadius: '0 10% 10% 0' }}
      animate={{ translateX: 0, borderRadius: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ translateX: -400, borderRadius: '0 10% 10% 0' }}
      className="mobile-menu"
    >
      <div className="mobile-menu__logo">
        <Logo />
      </div>
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
      <div aria-hidden onClick={onClose} className="mobile-menu__close">
        <MemoIcon />
      </div>
      <div className="mobile-menu__buttons">
        <Button onClick={toRegister} outline="fill" color="blue" text="Попробовать" />
        <Button onClick={toLogin} text="Войти" />
      </div>
    </motion.div>
  );
};
