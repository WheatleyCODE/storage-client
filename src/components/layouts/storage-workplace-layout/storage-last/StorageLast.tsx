import React, { FC, memo, useEffect, useCallback, useRef, useState } from 'react';
import { useClickOutside, useTypedDispatch } from 'hooks';
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

  const [items, setItems] = useState<WorkplaceItem[]>([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((e) => {
      const width = e[0].target.clientWidth;
      const els = Math.floor(width / ITEM_WIDTH);

      if (items.length !== els) {
        const copy = [...lastItems];
        copy.splice(els, items.length - els);
        setItems(copy);
      }
    });

    const node = ref.current;
    if (node) resizeObserver.observe(node);

    return () => {
      if (node) resizeObserver.unobserve(node);
    };
  }, [lastItems, items.length]);

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

  useClickOutside(ref, resetActive);

  return (
    <div className="storage-last">
      <div className="storage-last__title">Последние открытые</div>
      <div ref={ref} className="storage-last__items-desctop">
        {items.map((item, i) => (
          <StorageLastItem
            isActive={activeItems.includes(i)}
            changeActive={changeActive}
            index={i}
            item={item}
            key={item.id}
          />
        ))}
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
