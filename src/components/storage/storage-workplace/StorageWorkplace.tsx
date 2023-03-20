/* eslint-disable no-plusplus */
/* eslint-disable for-direction */
/* eslint-disable consistent-return */
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
import { IClientItemData, ItemTypes, ITrack, PathRoutes, EventNames, SelectSquare } from 'types';
import { Emitter } from 'helpers';
import { checkPathnameOnPathRoute } from 'utils';
import { StorageWorkplaceItem } from './storage-workplace-item/StorageWorkplaceItem';
import './StorageWorkplace.scss';

export interface IStorageWorkplace {
  workplaceItems: IClientItemData[];
}

export const StorageWorkplace: FC<IStorageWorkplace> = memo(({ workplaceItems }) => {
  const refDiv = useRef<null | HTMLDivElement>(null);
  const [selectSquareCoords, setSelectSquareCoords] = useState<SelectSquare>({});
  const [isShow, setIsShow] = useState(false);
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

  useEffect(() => {
    const node = refDiv.current;
    const main = ref.current;
    if (!node) return;
    if (!main) return;

    const { height: mainHeight } = node.getBoundingClientRect();
    const childrens = Array.from(main.children) as HTMLDivElement[];
    const item = childrens[0];
    const itemHeight = item?.offsetHeight;

    let activeIndexes: number[] = [];

    const selectCoords = {
      clickX: 0,
      clickY: 0,
      moveX: 0,
      moveY: 0,
    };

    let isDown = false;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      selectCoords.clickX = e.clientX;
      selectCoords.clickY = e.clientY;
      isDown = true;
      setIsShow(true);
      activeIndexes = [];
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = false;
      setIsShow(false);
      selectCoords.clickX = 0;
      selectCoords.clickY = 0;
      selectCoords.moveX = 0;
      selectCoords.moveY = 0;
      setSelectSquareCoords({});

      if (activeIndexes.length) {
        const items = activeIndexes.map((i) => workplaceItems[i].toServerItemData());
        dispatch(storageActions.setCurrent(items));
      }
      activeIndexes = [];
    };

    const getMoveCoords = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const rect = node.getClientRects();

      if (isDown) {
        const data: SelectSquare = {};

        selectCoords.moveX = e.clientX;
        selectCoords.moveY = e.clientY;

        const { left, top, height, width } = rect[0];

        data.left = selectCoords.clickX - left;
        data.top = selectCoords.clickY - top;

        let selHight = selectCoords.moveY - selectCoords.clickY;
        let selWidth = selectCoords.moveX - selectCoords.clickX;

        if (selHight < 0) {
          selHight *= -1;
          data.top = undefined;
          data.bottom = height - selectCoords.clickY + top;
        }

        if (selWidth < 0) {
          selWidth *= -1;
          data.left = undefined;
          data.right = width - selectCoords.clickX + left;
        }

        data.height = selHight;
        data.width = selWidth;

        if (data.top) {
          const px = data.top % itemHeight;

          const a = Math.floor(data.top / itemHeight);
          const b = Math.ceil((data.height + px) / itemHeight);

          activeIndexes = [];

          for (
            let i = 0;
            i < b && i < workplaceItems.length && i + a < workplaceItems.length;
            i++
          ) {
            activeIndexes.push(i + a);
          }

          setActiveItems(activeIndexes);
        }

        if (data.bottom) {
          const heg = childrens.length * itemHeight;
          const dataBottom = heg - (mainHeight - data.bottom);
          const px = dataBottom % itemHeight;

          const a = Math.floor(dataBottom / itemHeight);
          const b = Math.ceil((data.height + px) / itemHeight);

          activeIndexes = [];

          const spaceCoff = a >= 0 ? 0 : 1;

          for (let i = 0; i < b; i++) {
            activeIndexes.push(workplaceItems.length - 1 - a - i - spaceCoff);
          }

          activeIndexes = [...activeIndexes].filter((i) => i < workplaceItems.length);
          setActiveItems(activeIndexes);
        }

        setSelectSquareCoords(data);
      }
    };

    node.addEventListener('mousedown', onMouseDown);
    node.addEventListener('mouseup', onMouseUp);
    node.addEventListener('mousemove', getMoveCoords);

    return () => {
      node.removeEventListener('mousedown', onMouseDown);
      node.removeEventListener('mouseup', onMouseUp);
      node.removeEventListener('mousemove', getMoveCoords);
    };
  }, [workplaceItems]);

  return (
    <div
      ref={refDiv}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={onDropHandler}
      className={`storage-workplace ${isDragEnter ? 'drag' : ''}`}
    >
      {isShow && <div style={selectSquareCoords} className="select-square" />}
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
