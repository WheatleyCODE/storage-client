import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { PopupMenuItem } from './popup-menu-item/PopupMenuItem';

export interface PopupMenuProps {
  items: {
    title: string;
    path: string;
    Icon?: IconType;
  }[];
  onClose: () => void;
}

export const PopupMenu: FC<PopupMenuProps> = memo(({ items, onClose }) => {
  return (
    <div className="popup-menu">
      {items.map(({ title, path, Icon }) => (
        <PopupMenuItem Icon={Icon} onClose={onClose} key={title} title={title} path={path} />
      ))}
    </div>
  );
});
