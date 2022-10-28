import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link, animateScroll } from 'react-scroll';
import { PathRoutes } from 'types';
import './MobileMenuItem.scss';

export interface IMobileMenuItem {
  onClose: () => void;
  active?: boolean;
  title: string;
  path: string;
}

export const MobileMenuItem: FC<IMobileMenuItem> = (props) => {
  const { title, path, onClose, active } = props;
  const navigate = useNavigate();
  const location = useLocation();

  // todo check
  const isHash = (str: string) => str.split('').includes('#');
  const isHome = () => location.pathname === PathRoutes.HOME;

  const navigateHandler = () => {
    onClose();

    if (path === PathRoutes.HOME && isHome()) {
      animateScroll.scrollToTop({
        saveHashHistory: true,
        hashSpy: true,
        spy: true,
        smooth: true,
        duration: 350,
      });

      navigate(PathRoutes.HOME);
      return;
    }

    if (isHash(path) && !isHome()) {
      navigate(PathRoutes.HOME + path);
      return;
    }

    navigate(path);
  };

  return (
    <Link
      onClick={navigateHandler}
      className={`mobile-menu-item ${active ? 'active' : ''}`}
      activeClass="active"
      saveHashHistory
      hashSpy
      to={path}
      spy
      smooth
      duration={350}
    >
      {title}
    </Link>
  );
};
