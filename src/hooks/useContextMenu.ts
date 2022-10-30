import { HiOutlineUserAdd } from 'react-icons/hi';
import {
  MdContentCopy,
  MdDriveFileRenameOutline,
  MdOutlineBookmarkAdd,
  MdOutlineDriveFileMove,
  MdOutlineLink,
  MdOutlineOpenWith,
  MdOutlinePalette,
  MdRestore,
} from 'react-icons/md';
import { BiDownload, BiInfoCircle, BiTrash } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { useActions, useTypedSelector } from 'hooks';
import { ItemTypes } from 'types';

export interface IContextMenuItem {
  title: string;
  Icon: IconType;
  handler: () => void;
  brAfter?: boolean;
  brBefore?: boolean;
}

export interface IContextMenu {
  default: IContextMenuItem[];
  trash: IContextMenuItem[];
  workplace: {
    [ItemTypes.FOLDER]: IContextMenuItem[];
    [ItemTypes.FILE]: IContextMenuItem[];
    [ItemTypes.ALBUM]: IContextMenuItem[];
    [ItemTypes.TRACK]: IContextMenuItem[];
  };
}

export interface IUseContextMenu {
  contextMenuItems: IContextMenuItem[];
  itemsCount: number;
  brCount: number;
}

export const useContextMenu = (): IUseContextMenu => {
  const { logout } = useActions();
  const { currentItems } = useTypedSelector((state) => state.storage);

  const types = Array.from(new Set(currentItems.map((item) => item.type)));
  console.log(types, 'types');

  const contextMenu: IContextMenu = {
    default: [
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
      {
        title: 'Показать своства',
        Icon: BiInfoCircle,
        handler: logout,
      },
    ],
    trash: [
      {
        title: 'Востановить',
        Icon: MdRestore,
        handler: logout,
      },
      {
        title: 'Удалить навсегда',
        Icon: BiTrash,
        handler: logout,
      },
    ],
    workplace: {
      [ItemTypes.FOLDER]: [
        {
          title: 'Изменить цвет',
          Icon: MdOutlinePalette,
          handler: logout,
        },
      ],
      [ItemTypes.FILE]: [
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
      [ItemTypes.ALBUM]: [],
      [ItemTypes.TRACK]: [],
    },
  };

  return {
    contextMenuItems: contextMenu.default,
    itemsCount: contextMenu.default.length,
    brCount: contextMenu.default.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
  };
};
