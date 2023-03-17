import React, { FC, useCallback, useRef, useState, memo, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  useActions,
  useAudioPlayerHandlers,
  useClickOutside,
  useItems,
  useStorageHandlers,
  useTypedDispatch,
  useTypedSelector,
} from 'hooks';
import { storageActions } from 'store';
import { IClientItemData, ItemTypes, ITrack, PathRoutes } from 'types';
import { Emitter, EventNames } from 'helpers';
import { checkPathnameOnPathRoute } from 'utils';
import { StorageWorkplaceItem } from './storage-workplace-item/StorageWorkplaceItem';
import './StorageWorkplace.scss';

export interface IStorageWorkplace {
  workplaceItems: IClientItemData[];
}

export const StorageWorkplace: FC<IStorageWorkplace> = memo(({ workplaceItems }) => {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);
  const refInput = useRef<null | HTMLInputElement>(null);
  const params = useParams();
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();

  const { staredItems } = useTypedSelector((state) => state.storage);
  const { uploadFiles } = useActions();
  const tracks = useItems({ onlyTypes: [ItemTypes.TRACK], isParent: true }, true) as ITrack[];
  const { setTrack } = useAudioPlayerHandlers();
  const { openWorkpaceItem } = useStorageHandlers();

  const openFiles = useCallback(() => {
    if (refInput.current) {
      refInput.current.click();
    }
  }, [refInput]);

  useEffect(() => {
    const emitter = Emitter.getInstance();

    const unsub = emitter.subscribe(EventNames.OPEN_FILES, () => {
      openFiles();
    });

    return unsub;
  }, []);

  const changeActive = useCallback(
    (i: number) => {
      setTimeout(() => {
        dispatch(storageActions.setCurrent([workplaceItems[i].toServerItemData()]));
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
      dispatch(storageActions.addCurrent(workplaceItems[i].toServerItemData()));
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

      const newCurrentItems = indexes.map((num) => workplaceItems[num].toServerItemData());

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

  const uploadFilesHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const filds: { parent?: string } = {};

      if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_FOLDERS)) {
        filds.parent = params.id;
      }
      const files = [...(e.target.files as any)];
      uploadFiles({ files, ...filds });
    },
    [params.id, pathname]
  );

  const onDropHandler = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragEnter(false);

      const filds: { parent?: string } = {};

      if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_FOLDERS)) {
        filds.parent = params.id;
      }
      const files = [...(e.dataTransfer.files as any)];
      uploadFiles({ files, ...filds });
    },
    [params.id, pathname]
  );

  return (
    <div
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={onDropHandler}
      className={`storage-workplace ${isDragEnter ? 'drag' : ''}`}
    >
      <div ref={ref}>
        {workplaceItems.map((itemData, i) => {
          const isStar = staredItems.includes(itemData.id);

          return (
            <StorageWorkplaceItem
              setTrack={setTrack}
              openWorkpaceItem={openWorkpaceItem}
              uploadFiles={uploadFiles}
              isStar={isStar}
              tracks={tracks}
              changeActive={changeActive}
              addActive={addActive}
              addActiveShift={addActiveShift}
              key={itemData.id}
              isActive={activeItems.includes(i)}
              itemData={itemData}
              index={i}
            />
          );
        })}
      </div>

      <input
        ref={refInput}
        multiple
        onChange={uploadFilesHandler}
        type="file"
        className="storage-workplace__file-upload"
      />
    </div>
  );
});
