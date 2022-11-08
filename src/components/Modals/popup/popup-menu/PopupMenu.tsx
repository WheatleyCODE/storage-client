import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { PopupMenuItem } from './popup-menu-item/PopupMenuItem';

export interface PopupMenuProps {
  items: {
    title: string;
    path: string;
    Icon?: IconType;
    iconColor?: string;
    onClick?: () => void;
  }[];
  onClose: () => void;
}

export const PopupMenu: FC<PopupMenuProps> = memo(({ items, onClose }) => {
  return (
    <div className="popup-menu">
      {items.map(({ title, path, Icon, onClick, iconColor = 'grey' }) => (
        <PopupMenuItem
          iconColor={iconColor}
          onClick={onClick}
          Icon={Icon}
          onClose={onClose}
          key={title}
          title={title}
          path={path}
        />
      ))}
    </div>
  );
});
