import { useMemo } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import {
  MdContentCopy,
  MdDriveFileRenameOutline,
  MdOutlineBookmarkAdd,
  MdOutlineDriveFileMove,
  MdOutlineLink,
  MdOutlineOpenWith,
  MdOutlinePalette,
} from 'react-icons/md';
import { useActions, useTypedSelector } from 'hooks';
import { BiDownload, BiInfoCircle, BiTrash } from 'react-icons/bi';
import { IconType } from 'react-icons';

export interface IContextMenuItem {
  title: string;
  Icon: IconType;
  handler: () => void;
  brAfter?: boolean;
  brBefore?: boolean;
}

export interface IUseContextMenu {
  contextMenuItems: IContextMenuItem[];
  itemsCount: number;
  brCount: number;
}

export const useContextMenu = (): IUseContextMenu => {
  const { logout } = useActions();
  const { isAuth } = useTypedSelector((state) => state.auth);

  const folderMenuItems: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Изменить цвет',
        Icon: MdOutlinePalette,
        handler: logout,
      },
    ],
    []
  );

  const fileMenuItems: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Создать копию',
        Icon: MdContentCopy,
        handler: logout,
        brAfter: true,
      },
      {
        title: 'Скачать',
        Icon: BiDownload,
        handler: logout,
      },
    ],
    []
  );

  const contextMenuItems: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Открыть',
        Icon: MdOutlineOpenWith,
        handler: logout,
        brBefore: true,
      },
      {
        title: 'Изменить доступ',
        Icon: HiOutlineUserAdd,
        handler: logout,
      },
      {
        title: 'Получить ссылку',
        Icon: MdOutlineLink,
        handler: logout,
      },
      {
        title: 'Переместить',
        Icon: MdOutlineDriveFileMove,
        handler: logout,
      },
      {
        title: 'Добавить в отмеченные',
        Icon: MdOutlineBookmarkAdd,
        handler: logout,
      },
      {
        title: 'Переименовать',
        Icon: MdDriveFileRenameOutline,
        handler: logout,
      },
      ...folderMenuItems,
      ...fileMenuItems,
      {
        title: 'Показать своства',
        Icon: BiInfoCircle,
        handler: logout,
      },
      {
        title: 'Удалить',
        Icon: BiTrash,
        handler: logout,
        brAfter: true,
      },
    ],
    [fileMenuItems, folderMenuItems]
  );

  return {
    contextMenuItems,
    itemsCount: contextMenuItems.length,
    brCount: contextMenuItems.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
  };
};
