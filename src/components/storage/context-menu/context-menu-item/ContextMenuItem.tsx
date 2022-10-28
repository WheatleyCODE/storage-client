import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import './ContextMenuItem.scss';

export interface IContextMenuItemProps {
  Icon: IconType;
  title: string;
  onClose: () => void;
}

export const ContextMenuItem: FC<IContextMenuItemProps> = ({ Icon, title, onClose }) => {
  const MemoIcon = memo(Icon);

  return (
    <div aria-hidden onClick={onClose} className="context-menu-item">
      <MemoIcon className="context-menu-item__icon" />
      <div className="context-menu-item__title">{title}</div>
    </div>
  );
};
