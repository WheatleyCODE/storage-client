import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import './PopupMenuItem.scss';

export interface PopupMenuItemProps {
  title: string;
  path: string;
  onClose: () => void;
}

export const PopupMenuItem: FC<PopupMenuItemProps> = memo(({ title, path, onClose }) => {
  return (
    <Link onClick={onClose} to={path} className="popup-menu-item">
      {title}
    </Link>
  );
});
