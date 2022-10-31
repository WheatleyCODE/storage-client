import { HiOutlineUserAdd } from 'react-icons/hi';
import {
  MdAudiotrack,
  MdContentCopy,
  MdDriveFileRenameOutline,
  MdLibraryMusic,
  MdOutlineBookmarkAdd,
  MdOutlineCreateNewFolder,
  MdOutlineDriveFileMove,
  MdOutlineLink,
  MdOutlineOpenWith,
  MdOutlinePalette,
  MdRestore,
  MdSettingsSuggest,
  MdUploadFile,
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
  delete: IContextMenuItem[];
  default: IContextMenuItem[];
  trash: IContextMenuItem[];
  workplace: {
    [ItemTypes.FOLDER]: IContextMenuItem[];
    [ItemTypes.FILE]: IContextMenuItem[];
    [ItemTypes.ALBUM]: IContextMenuItem[];
    [ItemTypes.TRACK]: IContextMenuItem[];
  };
  workplaceMore: {
    [ItemTypes.FOLDER]: IContextMenuItem[];
    [ItemTypes.FILE]: IContextMenuItem[];
    [ItemTypes.ALBUM]: IContextMenuItem[];
    [ItemTypes.TRACK]: IContextMenuItem[];
  };
  defaultMore: IContextMenuItem[];
}

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
  const { logout } = useActions();
  const { currentItems } = useTypedSelector((state) => state.storage);

  const types = currentItems.map((item) => item.type);

  if (types.length === 0) {
    return {
      contextMenuItems: [
        {
          title: 'Создать папку',
          Icon: MdOutlineCreateNewFolder,
          handler: logout,
          brBefore: true,
        },
        {
          title: 'Создать альбом',
          Icon: MdLibraryMusic,
          handler: logout,
        },
        {
          title: 'Создать трек',
          Icon: MdAudiotrack,
          handler: logout,
        },
        {
          title: 'Загрузить фалы',
          Icon: MdUploadFile,
          handler: logout,
          brAfter: true,
        },
      ],
      itemsCount: 4,
      brCount: 2,
    };
  }

  const contextMenu: IContextMenu = {
    delete: [
      {
        title: 'Удалить',
        Icon: BiTrash,
        handler: logout,
        brAfter: true,
      },
    ],
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
      [ItemTypes.ALBUM]: [
        {
          title: 'Редактироввать',
          Icon: MdSettingsSuggest,
          handler: logout,
        },
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
      [ItemTypes.TRACK]: [
        {
          title: 'Редактироввать',
          Icon: MdSettingsSuggest,
          handler: logout,
        },
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
    },
    workplaceMore: {
      [ItemTypes.FOLDER]: [
        {
          title: 'Изменить цвет',
          Icon: MdOutlinePalette,
          handler: logout,
        },
      ],
      [ItemTypes.FILE]: [
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: logout,
        },
      ],
      [ItemTypes.ALBUM]: [
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
      [ItemTypes.TRACK]: [
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
    },
    defaultMore: [
      {
        title: 'Изменить доступ',
        Icon: HiOutlineUserAdd,
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
    ],
  };

  const createContextMenuOne = (type: ItemTypes): IContextMenuItem[] => {
    const { default: def, delete: del, workplace } = contextMenu;

    return [...def, ...workplace[type], ...del];
  };

  const createContextMenuMore = (typeArr: ItemTypes[]): IContextMenuItem[] => {
    const { defaultMore: def, delete: del, workplaceMore } = contextMenu;
    const arr = Array.from(new Set(typeArr));

    if (arr.length === 1) {
      return [...def, ...workplaceMore[arr[0]], ...del];
    }

    const dd = types.includes(ItemTypes.FOLDER)
      ? [
          {
            title: 'Создать копию',
            Icon: MdContentCopy,
            handler: logout,
            brAfter: true,
          },
        ]
      : workplaceMore[types[0]];

    return [...def, ...dd, ...del];
  };

  const contextMenuItems =
    types.length === 1 ? createContextMenuOne(types[0]) : createContextMenuMore(types);

  return {
    contextMenuItems,
    itemsCount: contextMenuItems.length,
    brCount: contextMenuItems.filter(({ brAfter, brBefore }) => brAfter || brBefore).length,
  };
};
