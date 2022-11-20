import React, { FC, memo, useCallback } from 'react';
import { storageActions } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { sortItems } from 'consts';
import { SortTypes } from 'types';
import { SortItem } from './sort-item/SortItem';
import './StorageSorter.scss';

export const StorageSorter: FC = memo(() => {
  const { sortType } = useTypedSelector((state) => state.storage);
  const dispatch = useTypedDispatch();

  const changeSortType = useCallback((type: SortTypes) => {
    dispatch(storageActions.setSortType(type));
  }, []);

  return (
    <div className="storage-sorter">
      {sortItems.map((item) => (
        <SortItem
          key={item.title}
          item={item}
          isActive={item.sortType === sortType || item.sortTypeReverce === sortType}
          changeSortType={changeSortType}
        />
      ))}
    </div>
  );
});
