import React, { FC } from 'react';
import { IContextOptions } from 'hooks';
import { ContextMenuPopupOption } from './context-menu-popup-option/ContextMenuPopupOption';
import './ContextMenuPopup.scss';

export interface IContextMenuPopupProps {
  options: IContextOptions[];
}

export const ContextMenuPopup: FC<IContextMenuPopupProps> = ({ options }) => {
  return (
    <div className="context-menu-popup">
      {options.map((option) => (
        <ContextMenuPopupOption key={option.color} option={option} />
      ))}
    </div>
  );
};
