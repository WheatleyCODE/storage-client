import { useMemo } from 'react';
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
import { useActions } from 'hooks';
import { ItemTypes } from 'types';

export interface IContextMenuItem {
  title: string;
  Icon: IconType;
  handler: () => void;
  brAfter?: boolean;
  brBefore?: boolean;
}

export interface IWorkplaceCMI {
  [ItemTypes.FOLDER]: IContextMenuItem[];
  [ItemTypes.FILE]: IContextMenuItem[];
  [ItemTypes.ALBUM]: IContextMenuItem[];
  [ItemTypes.TRACK]: IContextMenuItem[];
}

export const useContextMenuItems = () => {
  const { logout } = useActions();

  const createCMI: IContextMenuItem[] = useMemo(
    () => [
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
    []
  );

  const defaultCMI: IContextMenuItem[] = useMemo(
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
      {
        title: 'Показать своства',
        Icon: BiInfoCircle,
        handler: logout,
      },
    ],
    []
  );

  const trashCMI: IContextMenuItem[] = useMemo(
    () => [
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
    []
  );

  const deleteCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Удалить',
        Icon: BiTrash,
        handler: logout,
        brAfter: true,
      },
    ],
    []
  );

  const copyCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Создать копию',
        Icon: MdContentCopy,
        handler: logout,
        brAfter: true,
      },
    ],
    []
  );

  const workplaceCMI: IWorkplaceCMI = useMemo(
    () => ({
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
    }),
    []
  );

  const workplaceMoreCMI: IWorkplaceCMI = useMemo(
    () => ({
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
    }),
    []
  );

  const defaultMoreCMI: IContextMenuItem[] = useMemo(
    () => [
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
    []
  );

  return {
    createCMI,
    defaultCMI,
    trashCMI,
    deleteCMI,
    copyCMI,
    workplaceCMI,
    workplaceMoreCMI,
    defaultMoreCMI,
  };
};
