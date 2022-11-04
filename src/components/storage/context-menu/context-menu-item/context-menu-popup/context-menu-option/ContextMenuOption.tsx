import React, { FC } from 'react';
import { IContextOptions } from 'hooks';
import './ContextMenuOption.scss';

export interface IContextMenuOptionProps {
  option: IContextOptions;
}

export const ContextMenuOption: FC<IContextMenuOptionProps> = ({ option }) => {
  const { color, handler } = option;

  return (
    <div aria-hidden onClick={handler} className="context-menu-option">
      {color}
    </div>
  );
};
