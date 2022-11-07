import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import './SelectItem.scss';

export interface ISelectItem {
  Icon?: IconType;
  text: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ISelectItemProps {
  item: ISelectItem;
}

export const SelectItem: FC<ISelectItemProps> = ({ item }) => {
  const { text, Icon, onClick } = item;
  const MemoIcon = Icon && memo(Icon);

  return (
    <div aria-hidden onClick={onClick} className="select-item">
      {MemoIcon && (
        <div className="select-item__icon">
          <MemoIcon />
        </div>
      )}

      <div className="select-item__text">{text}</div>
    </div>
  );
};
