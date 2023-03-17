import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useTypedSelector } from 'hooks';
import { IContextMenuItem, PathRoutes } from 'types';
import { useContextMenuItems } from './useContextMenuItems';

export interface IUseContextMenu {
  contextMenuItems: IContextMenuItem[];
  itemsCount: number;
  brCount: number;
}

export const useContextMenu = (isPopup = false): IUseContextMenu => {
  const { pathname } = useLocation();
  const { currentItems } = useTypedSelector((state) => state.storage);
  const types = currentItems.map((item) => item.type);
  const typesArr = Array.from(new Set(types));
  const { createCMI, defaultCMI, trashCMI, openCMI, specialCMI, specialMoreCMI, defaultMoreCMI } =
    useContextMenuItems();

  const CMI = useMemo(() => {
    if (types.length === 1) {
      let create: IContextMenuItem[] = [];

      if (isPopup) {
        createCMI[createCMI.length - 1].brBefore = true;
        create = createCMI;
      }

      const specialItems = specialCMI[types[0]];
      const items = [...defaultCMI];
      items.splice(6, 0, ...specialItems);

      return [...create, ...(isPopup ? [] : openCMI), ...items];
    }

    return [...createCMI];
  }, [createCMI, defaultCMI, currentItems, specialCMI, isPopup]);

  const moreCMI = useMemo(() => {
    if (typesArr.length === 1) {
      return [...defaultMoreCMI, ...specialMoreCMI[typesArr[0]]];
    }

    return [...defaultMoreCMI, ...specialMoreCMI.TRACK];
  }, [defaultMoreCMI, currentItems, specialMoreCMI]);

  if (pathname === PathRoutes.STORAGE_TRASH) {
    if (types.length === 0) {
      return {
        contextMenuItems: CMI,
        itemsCount: CMI.length,
        brCount: CMI.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
      };
    }

    return {
      contextMenuItems: trashCMI,
      itemsCount: trashCMI.length,
      brCount: trashCMI.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
    };
  }

  if (types.length === 1 || types.length === 0) {
    return {
      contextMenuItems: CMI,
      itemsCount: CMI.length,
      brCount: CMI.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
    };
  }

  return {
    contextMenuItems: moreCMI,
    itemsCount: moreCMI.length,
    brCount: moreCMI.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
  };
};
