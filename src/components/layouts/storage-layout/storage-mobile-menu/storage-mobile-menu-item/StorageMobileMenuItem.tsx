import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { PathRoutes } from 'types';
import './StorageMobileMenuItem.scss';

export interface IStorageMobileMenuItemProps {
  title: string;
  path: PathRoutes;
  Icon: IconType;
  onClose: () => void;
}

export const StorageMobileMenuItem: FC<IStorageMobileMenuItemProps> = memo((props) => {
  const { title, path, Icon, onClose } = props;
  const MemoIcon = memo(Icon);

  return (
    <NavLink onClick={onClose} to={path} className="storage-mobile-menu-item">
      <div className="storage-mobile-menu-item__icon">
        <MemoIcon />
      </div>
      <div className="storage-mobile-menu__title">{title}</div>
    </NavLink>
  );
});
