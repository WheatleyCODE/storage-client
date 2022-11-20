import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { BsArrowDownShort } from 'react-icons/bs';
import { SortTypes } from 'types';
import './SortItem.scss';

export interface SortItemProps {
  changeSortType: (type: SortTypes) => void;
  isActive: boolean;
  item: {
    title: string;
    sortType: SortTypes;
    sortTypeReverce: SortTypes;
  };
}

export const SortItem: FC<SortItemProps> = memo(({ item, changeSortType, isActive }) => {
  const [isReverce, setIsReverce] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const MemoIcon = memo(BsArrowDownShort);

  const onClick = useCallback(() => {
    if (isClick && !isReverce) {
      changeSortType(item.sortTypeReverce);
      setIsReverce(true);
      return;
    }

    changeSortType(item.sortType);
    setIsClick(true);
    setIsReverce(false);
  }, [changeSortType, isClick, isReverce, item.sortType, item.sortTypeReverce]);

  useEffect(() => {
    if (isActive) {
      setIsClick(true);
    }

    if (!isActive) {
      setIsReverce(false);
      setIsClick(false);
    }
  }, [isActive]);

  return (
    <div aria-hidden onClick={onClick} className={`sort-item ${isActive ? 'active' : ''}`}>
      <div className="sort-item__title">{item.title}</div>
      <div className={`sort-item__icon ${isReverce ? 'reverce' : ''}`}>
        <div className="svg">
          <MemoIcon />
        </div>
      </div>
    </div>
  );
});
