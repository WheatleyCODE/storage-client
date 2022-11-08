import React, { FC } from 'react';
import { IContextOptions } from 'hooks';
import { ContextMenuPopupOption } from './context-menu-popup-option/ContextMenuPopupOption';
import './ContextMenuPopup.scss';

export interface IContextMenuPopupProps {
  options: IContextOptions[];
  onClose: () => void;
}

export const ContextMenuPopup: FC<IContextMenuPopupProps> = ({ options, onClose }) => {
  return (
    <div className="context-menu-popup">
      {options.map((option) => (
        <ContextMenuPopupOption onClose={onClose} key={option.color} option={option} />
      ))}
    </div>
  );
};
