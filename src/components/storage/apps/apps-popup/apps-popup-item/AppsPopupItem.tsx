import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'types';
import './AppsPopupItem.scss';

export interface AppsPopupItemProps {
  Icon: IconType;
  title: string;
  path: PathRoutes;
  onClose: () => void;
}

export const AppsPopupItem: FC<AppsPopupItemProps> = ({ Icon, title, path, onClose }) => {
  return (
    <Link onClick={onClose} className="apps-popup-item" to={path}>
      <Icon className="apps-popup-item__icon" />
      {title}
    </Link>
  );
};
