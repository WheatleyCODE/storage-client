import React, { FC, memo } from 'react';
import { noAuthDesctopMenu } from 'consts';
import { MenuItem } from './menu-item/MenuItem';
import './Menu.scss';

export const Menu: FC = memo(() => {
  return (
    <div className="menu">
      <ul>
        {noAuthDesctopMenu.map((item) => (
          <li key={item.path}>
            <MenuItem title={item.title} path={item.path} />
          </li>
        ))}
      </ul>
    </div>
  );
});
