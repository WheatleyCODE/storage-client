import { headerMenu } from 'consts';
import React, { FC } from 'react';
import { MenuItem } from './MenuItem/MenuItem';
import './Menu.scss';

export const Menu: FC = () => {
  return (
    <div className="menu">
      <ul>
        {headerMenu.map((item) => (
          <li key={item.path}>
            <MenuItem title={item.title} path={item.path} />
          </li>
        ))}
      </ul>
    </div>
  );
};
