import React, { FC, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';
import { FaTimes } from 'react-icons/fa';
import { Button } from 'components';
import { headerMenu, mobileNoAuthMenu } from 'consts';
import { MobileMenuItem } from './MobileMenuItem/MobileMenuItem';
import { Logo } from '../Logo/Logo';
import './MobileMenu.scss';

export interface IMobileMenu {
  onClose: () => void;
}

export const MobileMenu: FC<IMobileMenu> = ({ onClose }) => {
  const location = useLocation();

  const mobileNoAuthItems = useMemo(() => [...headerMenu, ...mobileNoAuthMenu], []);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

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
        {mobileNoAuthItems.map((item) => (
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
        <Button outline="fill" color="blue" text="Попробовать" />
        <Button text="Войти" />
      </div>
    </motion.div>
  );
};
