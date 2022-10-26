import React, { FC, memo } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import './SortItem.scss';

export interface SortItemProps {
  title: string;
  sortFn: (boolean: boolean) => void;
}

export const SortItem: FC<SortItemProps> = memo(({ title, sortFn }) => {
  const MemoIcon = memo(HiChevronDown);
  return (
    <div className="sort-item">
      <div className="sort-item__title">{title}</div>
      <div className="sort-item__icon">
        <MemoIcon />
      </div>
    </div>
  );
});
