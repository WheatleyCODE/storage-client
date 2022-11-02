import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import './ContextMenuItem.scss';

export interface IContextMenuItemProps {
  Icon: IconType;
  title: string;
  onClose: () => void;
  handler: () => void;
}

export const ContextMenuItem: FC<IContextMenuItemProps> = ({ Icon, title, onClose, handler }) => {
  const MemoIcon = memo(Icon);

  const onClick = () => {
    onClose();
    handler();
  };

  return (
    <div aria-hidden onClick={onClick} className="context-menu-item">
      <MemoIcon className="context-menu-item__icon" />
      <div className="context-menu-item__title">{title}</div>
    </div>
  );
};
