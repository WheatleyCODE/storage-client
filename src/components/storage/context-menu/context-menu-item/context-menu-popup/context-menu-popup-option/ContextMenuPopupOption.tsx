import React, { FC } from 'react';
import { IContextOptions } from 'hooks';
import './ContextMenuPopupOption.scss';

export interface IContextMenuPopupOptionProps {
  option: IContextOptions;
}

export const ContextMenuPopupOption: FC<IContextMenuPopupOptionProps> = ({ option }) => {
  const { color, handler } = option;

  return (
    <div
      aria-hidden
      onClick={handler}
      className={`context-menu-popup-option ${color.toLocaleLowerCase()}`}
    />
  );
};
