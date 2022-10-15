import { headerMenu } from 'consts';
import React from 'react';
import { MenuItem } from './MenuItem/MenuItem';
import './Menu.scss';

export const Menu = () => {
  return (
    <div className="menu">
      <ul>
        {headerMenu.map((item) => (
          <li>
            <MenuItem key={item.path} title={item.title} path={item.path} />
          </li>
        ))}
      </ul>
    </div>
  );
};
