import { allApps } from 'consts';
import React, { FC, memo } from 'react';
import { AppsPopupItem } from './apps-popup-item/AppsPopupItem';
import './AppsPopup.scss';

export interface IAppsPopupProps {
  onClose: () => void;
}

export const AppsPopup: FC<IAppsPopupProps> = memo(({ onClose }) => {
  return (
    <div className="apps-popup">
      {allApps.map(({ Icon, title, path }) => (
        <AppsPopupItem key={title} onClose={onClose} Icon={Icon} title={title} path={path} />
      ))}
    </div>
  );
});
