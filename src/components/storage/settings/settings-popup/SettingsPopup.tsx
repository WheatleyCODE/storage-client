import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PathRoutes } from 'types';
import './SettingsPopup.scss';

export interface ISettingsPopupProps {
  onClose: () => void;
}

export const SettingsPopup: FC<ISettingsPopupProps> = ({ onClose }) => {
  const { pathname } = useLocation();

  return (
    <div className="settings-popup">
      <Link
        to={`${pathname}${PathRoutes.STORAGE_SETTINGS}`}
        onClick={onClose}
        className="settings-popup__settings"
      >
        Настройки
      </Link>
      <Link
        to={`${pathname}${PathRoutes.STORAGE_HOTKEYS}`}
        onClick={onClose}
        className="settings-popup__hotkeys"
      >
        Горячие клавиши
      </Link>
    </div>
  );
};