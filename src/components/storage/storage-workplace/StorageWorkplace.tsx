import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside, useTypedDispatch } from 'hooks';
import { storageActions } from 'store';
import { WorkplaceItem } from 'types';
import { StorageWorkplaceItem } from './storage-workplace-item/StorageWorkplaceItem';
import './StorageWorkplace.scss';

export interface IStorageWorkplaceProps {
  items: WorkplaceItem[];
}

export const StorageWorkplace: FC<IStorageWorkplaceProps> = ({ items }) => {
  const [activeArr, setActiveArr] = useState<number[]>([]);
  const ref = useRef<null | HTMLDivElement>(null);
  const dispatch = useTypedDispatch();

  const changeActive = useCallback((i: number) => setActiveArr([i]), []);
  const resetActive = useCallback(() => setActiveArr([]), []);
  const addActive = useCallback((i: number) => setActiveArr((p) => [...p, i]), []);

  const addActiveShift = (i: number) => {
    const indexes: number[] = [];
    const side = activeArr[activeArr.length - 1] >= i;
    const res = activeArr[activeArr.length - 1] - i;
    const iter = side ? res : res * -1;

    for (let j = 0; j <= iter; j += 1) {
      indexes.push(i + (side ? j : -j));
    }

    setActiveArr(indexes);
  };

  useClickOutside(ref, resetActive);

  useEffect(() => {
    const activeItems = activeArr.map((index) => items[index]);

    dispatch(storageActions.setCurrent(activeItems));
  }, [activeArr, items]);

  return (
    <div ref={ref} className="storage-workplace">
      {items.map((item, i) => (
        <StorageWorkplaceItem
          changeActive={changeActive}
          addActive={addActive}
          addActiveShift={addActiveShift}
          key={item.id}
          isActive={activeArr.includes(i)}
          item={item}
          index={i}
        />
      ))}
    </div>
  );
};
