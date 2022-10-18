import React, { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-scroll';
import { PathRoutes } from 'types';
import './MenuItem.scss';

interface IMenuItemProps {
  title: string;
  path: string;
}

export const MenuItem: FC<IMenuItemProps> = ({ title, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateHandler = useCallback(() => {
    if (location.pathname !== PathRoutes.HOME) {
      navigate(PathRoutes.HOME + path);
    }
  }, [location.pathname, navigate, path]);

  return (
    <Link
      onClick={navigateHandler}
      className="menu-item"
      activeClass="active"
      saveHashHistory
      hashSpy
      to={path}
      spy
      smooth
      duration={500}
    >
      {title}
    </Link>
  );
};
