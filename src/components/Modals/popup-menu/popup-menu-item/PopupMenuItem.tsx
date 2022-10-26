import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import './PopupMenuItem.scss';

export interface PopupMenuItemProps {
  Icon?: IconType;
  title: string;
  path: string;
  onClose: () => void;
}

export const PopupMenuItem: FC<PopupMenuItemProps> = memo(({ title, path, onClose, Icon }) => {
  const MemoIcon = Icon && memo(Icon);
  return (
    <Link onClick={onClose} to={path} className={`popup-menu-item ${MemoIcon ? 'icon' : ''}`}>
      {MemoIcon && <MemoIcon className="popup-menu-item__icon" />}
      {title}
    </Link>
  );
});
