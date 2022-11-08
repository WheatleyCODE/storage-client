import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import './PopupMenuItem.scss';

export interface PopupMenuItemProps {
  Icon?: IconType;
  iconColor: string;
  title: string;
  path: string;
  onClose: () => void;
  onClick?: () => void;
}

export const PopupMenuItem: FC<PopupMenuItemProps> = memo((props) => {
  const { title, path, onClose, Icon, onClick, iconColor } = props;
  const MemoIcon = Icon && memo(Icon);

  const onClickHandler = () => {
    if (onClick) onClick();

    onClose();
  };

  return (
    <Link
      onClick={onClickHandler}
      to={path}
      className={`popup-menu-item ${MemoIcon ? 'icon' : ''}`}
    >
      {MemoIcon && <MemoIcon className={`popup-menu-item__icon ${iconColor}`} />}
      {title}
    </Link>
  );
});
