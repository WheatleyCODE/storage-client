import React, { FC, useCallback, useRef, useState, memo, useEffect } from 'react';
import { useClickOutside, useTypedDispatch } from 'hooks';
import { storageActions } from 'store';
import { WorkplaceItem } from 'types';
import { emitter, EventNames } from 'helpers';
import { StorageWorkplaceItem } from './storage-workplace-item/StorageWorkplaceItem';
import './StorageWorkplace.scss';

export interface IStorageWorkplace {
  workplaceItems: WorkplaceItem[];
}

export const StorageWorkplace: FC<IStorageWorkplace> = memo(({ workplaceItems }) => {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);
  const refInput = useRef<null | HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const openFiles = useCallback(() => {
    if (refInput.current) {
      refInput.current.click();
    }
  }, [refInput]);

  useEffect(() => {
    const unsub = emitter.subscribe(EventNames.OPEN_FILES, () => {
      openFiles();
    });

    return unsub;
  }, []);

  const changeActive = useCallback(
    (i: number) => {
      setTimeout(() => {
        dispatch(storageActions.setCurrent([workplaceItems[i]]));
        setActiveItems([i]);
      }, 0);
    },
    [workplaceItems]
  );

  const resetActive = useCallback(() => {
    setTimeout(() => {
      dispatch(storageActions.setCurrent([]));
    }, 0);

    if (activeItems.length) {
      setActiveItems([]);
    }
  }, [activeItems.length]);

  const addActive = useCallback(
    (i: number) => {
      dispatch(storageActions.addCurrent(workplaceItems[i]));
      setActiveItems((p) => {
        if (!p.includes(i)) return [...p, i];
        return p;
      });
    },
    [workplaceItems]
  );

  const addActiveShift = useCallback(
    (i: number) => {
      const indexes: number[] = [];
      const side = activeItems[activeItems.length - 1] >= i;
      const res = activeItems[activeItems.length - 1] - i;
      const iter = side ? res : res * -1;

      for (let j = 0; j <= iter; j += 1) {
        indexes.push(i + (side ? j : -j));
      }

      const newCurrentItems = indexes.map((num) => workplaceItems[num]);

      dispatch(storageActions.setCurrent(newCurrentItems));
      setActiveItems(indexes);
    },
    [activeItems, workplaceItems]
  );

  useClickOutside(ref, resetActive, ['click', 'contextmenu']);

  const onDragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(true);
  }, []);

  const onDragLeaveHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(false);
  }, []);

  const onDropHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(false);
    const { files } = e.dataTransfer;

    console.log(files);
  }, []);

  return (
    <div
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={onDropHandler}
      className={`storage-workplace ${isDragEnter ? 'drag' : ''}`}
    >
      <div ref={ref}>
        {workplaceItems.map((item, i) => (
          <StorageWorkplaceItem
            changeActive={changeActive}
            addActive={addActive}
            addActiveShift={addActiveShift}
            key={item.id}
            isActive={activeItems.includes(i)}
            item={item}
            index={i}
          />
        ))}
      </div>

      <input
        ref={refInput}
        multiple
        onChange={() => {}}
        type="file"
        className="storage-workplace__file-upload"
      />
    </div>
  );
});
