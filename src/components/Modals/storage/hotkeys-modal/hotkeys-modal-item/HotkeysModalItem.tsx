import React, { FC } from 'react';
import './HotkeysModalItem.scss';

export interface IHotkeysModalItemProps {
  hotkey: {
    title: string;
    key: string;
  };
}

export const HotkeysModalItem: FC<IHotkeysModalItemProps> = ({ hotkey }) => {
  return (
    <div className="hotkeys-modal-item">
      <div className="hotkeys-modal-item__title">{hotkey.title}</div>
      <div className="hotkeys-modal-item__key">{hotkey.key}</div>
    </div>
  );
};
