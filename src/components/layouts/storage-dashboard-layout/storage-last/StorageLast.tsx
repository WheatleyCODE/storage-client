import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { ITEM_WIDTH } from 'consts';
import { StorageLastItem } from './storage-last-item/StorageLastItem';
import './StorageLast.scss';

const arr = Array(7)
  .fill(null)
  .map((_, i) => i);

export const StorageLast: FC = memo(() => {
  const [items, setItems] = useState(arr);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((e) => {
      const width = e[0].target.clientWidth;
      const els = Math.floor(width / ITEM_WIDTH);

      if (items.length !== els) {
        const copy = [...arr];
        copy.splice(els, items.length - els);
        setItems(copy);
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className="storage-last">
      {items.map((item) => (
        <StorageLastItem key={item} />
      ))}
    </div>
  );
});
