import React, { FC } from 'react';
import { IContextOptions } from 'hooks';
import './ContextMenuPopupOption.scss';

export interface IContextMenuPopupOptionProps {
  option: IContextOptions;
  onClose: () => void;
}

export const ContextMenuPopupOption: FC<IContextMenuPopupOptionProps> = ({ option, onClose }) => {
  const { color, handler } = option;

  const onClick = () => {
    onClose();
    handler();
  };

  return (
    <div
      aria-hidden
      onClick={onClick}
      className={`context-menu-popup-option ${color.toLocaleLowerCase()}`}
    />
  );
};
