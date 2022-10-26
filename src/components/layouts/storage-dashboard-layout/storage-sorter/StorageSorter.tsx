import React, { FC, memo } from 'react';
import { SortItem } from './sort-item/SortItem';
import './StorageSorter.scss';

export const StorageSorter: FC = memo(() => {
  return (
    <div className="storage-sorter">
      <SortItem sortFn={() => {}} title="Название" />
      <SortItem sortFn={() => {}} title="Доступ" />
      <SortItem sortFn={() => {}} title="Дата открытия" />
      <SortItem sortFn={() => {}} title="Размер" />
    </div>
  );
});
