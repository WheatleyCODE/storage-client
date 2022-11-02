import React, { FC, useCallback, useRef, useState } from 'react';
import { useClickOutside, useResizeObserver, useTypedDispatch } from 'hooks';
import { storageActions } from 'store';
import { ITEM_WIDTH } from 'consts';
import { WorkplaceItem } from 'types';
import { StorageLastItem } from './storage-last-item/StorageLastItem';
import './StorageLast.scss';

export interface IStorageLastProps {
  lastItems: WorkplaceItem[];
}

export const StorageLast: FC<IStorageLastProps> = ({ lastItems }) => {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const dispatch = useTypedDispatch();
  const ref = useRef<null | HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState<number>(0);

  useResizeObserver(ref, (e) => {
    const els = Math.floor(e.width / ITEM_WIDTH);
    setItemsCount(els);
  });

  const changeActive = useCallback(
    (i: number) => {
      setTimeout(() => {
        dispatch(storageActions.setCurrent([lastItems[i]]));
        setActiveItems([i]);
      }, 0);
    },
    [lastItems]
  );

  const resetActive = useCallback(() => {
    if (activeItems.length) {
      setActiveItems([]);
      dispatch(storageActions.setCurrent([]));
    }
  }, [activeItems.length]);

  useClickOutside(ref, resetActive, ['click', 'contextmenu']);

  return (
    <div ref={ref} className="storage-last">
      <div className="storage-last__title">Последние открытые</div>
      <div className="storage-last__items-desctop">
        {lastItems
          .map((item, i) => (
            <StorageLastItem
              isActive={activeItems.includes(i)}
              changeActive={changeActive}
              index={i}
              item={item}
              key={item.id}
            />
          ))
          .slice(0, itemsCount)}
      </div>

      <div className="storage-last__visual right" />
      <div className="storage-last__visual left" />

      <div className="storage-last__items-mobile">
        {lastItems.map((item, i) => (
          <StorageLastItem
            isActive={activeItems.includes(i)}
            changeActive={changeActive}
            index={i}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};
