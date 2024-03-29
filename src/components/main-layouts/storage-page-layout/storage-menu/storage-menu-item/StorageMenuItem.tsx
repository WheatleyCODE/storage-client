import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { PathRoutes } from 'types';
import './StorageMenuItem.scss';

export interface IStorageMenuItemProps {
  title: string;
  path: PathRoutes;
  Icon: IconType;
  isOpen: boolean;
  onClick: () => void;
}

export const StorageMenuItem: FC<IStorageMenuItemProps> = memo((props) => {
  const { title, path, Icon, isOpen, onClick } = props;
  const MemoIcon = memo(Icon);

  return (
    <NavLink onClick={onClick} to={path} className={`storage-menu-item ${!isOpen ? 'close' : ''}`}>
      <div className="storage-menu-item__icon">
        <MemoIcon />
      </div>
      {isOpen && <div className="storage-menu-item__title">{title}</div>}
    </NavLink>
  );
});
