import React, { FC } from 'react';
import { Link } from 'react-scroll';
import './MenuItem.scss';

interface IMenuItemProps {
  title: string;
  path: string;
}

export const MenuItem: FC<IMenuItemProps> = ({ title, path }) => {
  return (
    <Link
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
