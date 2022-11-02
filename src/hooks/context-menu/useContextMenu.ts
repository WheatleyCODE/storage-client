import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useTypedSelector } from 'hooks';
import { ItemTypes, PathRoutes } from 'types';
import { IContextMenuItem, useContextMenuItems } from './useContextMenuItems';

export interface IUseContextMenu {
  contextMenuItems: IContextMenuItem[];
  itemsCount: number;
  brCount: number;
}

// ! Временно так
// Todo переделать после корректировки сервера
// Todo сделать корректное генерирование
// Todo добавить скачку сущностей которые в данный момент не доступны

// Todo одновременно с фиксом методов сервера пофиксить и генерацию с запросами
// * (-_-)... ♪

export const useContextMenu = (): IUseContextMenu => {
  const { pathname } = useLocation();
  const { currentItems } = useTypedSelector((state) => state.storage);
  const types = currentItems.map((item) => item.type);
  const typesArr = Array.from(new Set(types));
  const {
    createCMI,
    defaultCMI,
    trashCMI,
    deleteCMI,
    copyCMI,
    workplaceCMI,
    workplaceMoreCMI,
    defaultMoreCMI,
  } = useContextMenuItems();

  const CMI = useMemo(() => {
    if (types.length === 1) {
      return [...defaultCMI, ...workplaceCMI[types[0]], ...deleteCMI];
    }

    return [...createCMI];
  }, [createCMI, defaultCMI, deleteCMI, currentItems, workplaceCMI]);

  const moreCMI = useMemo(() => {
    if (typesArr.length === 1) {
      return [...defaultMoreCMI, ...workplaceMoreCMI[typesArr[0]], ...deleteCMI];
    }

    const addCMI = types.includes(ItemTypes.FOLDER) ? copyCMI : workplaceMoreCMI.TRACK;

    return [...defaultMoreCMI, ...addCMI, ...deleteCMI];
  }, [copyCMI, defaultMoreCMI, deleteCMI, currentItems, workplaceMoreCMI]);

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
