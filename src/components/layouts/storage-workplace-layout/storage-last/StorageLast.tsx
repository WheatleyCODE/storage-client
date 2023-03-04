import React, { FC, useCallback, useRef, useState } from 'react';
import { useClickOutside, useResizeObserver, useTypedDispatch } from 'hooks';
import { storageActions } from 'store';
import { ITEM_WIDTH } from 'consts';
import { IItemProperties } from 'types';
import { StorageLastItem } from './storage-last-item/StorageLastItem';
import './StorageLast.scss';

export interface IStorageLastProps {
  lastItemsData: IItemProperties[];
}

export const StorageLast: FC<IStorageLastProps> = ({ lastItemsData }) => {
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
        setActiveItems([i]);
        dispatch(storageActions.setCurrent([lastItemsData[i].toWorkplaceItem()]));
      }, 1);
    },
    [lastItemsData]
  );

  const resetActive = useCallback(() => {
    setActiveItems([]);
  }, [lastItemsData.length]);

  useClickOutside(ref, resetActive, ['click', 'contextmenu']);

  return (
    <div ref={ref} className="storage-last">
      <div className="storage-last__title">Последние открытые</div>
      <div className="storage-last__items-desctop">
        {lastItemsData
          .map((itemData, i) => (
            <StorageLastItem
              isActive={activeItems.includes(i)}
              changeActive={changeActive}
              index={i}
              itemData={itemData}
              key={itemData.id}
            />
          ))
          .slice(0, itemsCount)}
      </div>

      <div className="storage-last__visual right" />
      <div className="storage-last__visual left" />

      <div className="storage-last__items-mobile">
        {lastItemsData.map((itemData, i) => (
          <StorageLastItem
            isActive={activeItems.includes(i)}
            changeActive={changeActive}
            index={i}
            itemData={itemData}
            key={itemData.id}
          />
        ))}
      </div>
    </div>
  );
};
