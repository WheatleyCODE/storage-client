import React, { FC, memo } from 'react';
import { PopupMenuItem } from './popup-menu-item/PopupMenuItem';
import './PopupMenu.scss';

export interface PopupMenuProps {
  items: { title: string; path: string }[];
  onClose: () => void;
}

export const PopupMenu: FC<PopupMenuProps> = memo(({ items, onClose }) => {
  return (
    <div className="popup-menu">
      {items.map(({ title, path }) => (
        <PopupMenuItem onClose={onClose} key={title} title={title} path={path} />
      ))}
    </div>
  );
});
