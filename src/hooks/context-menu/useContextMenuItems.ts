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
import { FolderColors, ItemTypes } from 'types';
import { useContextMenuHandlers } from './useCoontextMenuHandlers';

export interface IContextOptions {
  color: FolderColors;
  handler: () => void;
}
export interface IContextMenuItem {
  title: string;
  Icon: IconType;
  handler: () => void;
  brAfter?: boolean;
  brBefore?: boolean;
  options?: IContextOptions[];
}

export interface IWorkplaceCMI {
  [ItemTypes.FOLDER]: IContextMenuItem[];
  [ItemTypes.FILE]: IContextMenuItem[];
  [ItemTypes.ALBUM]: IContextMenuItem[];
  [ItemTypes.TRACK]: IContextMenuItem[];
}

export const useContextMenuItems = () => {
  const { getOpenModal, changeIsTrashHandler, changeColorHandler, openIsInfo } =
    useContextMenuHandlers();

  const createCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Создать папку',
        Icon: MdOutlineCreateNewFolder,
        handler: getOpenModal('isCreateFolder'),
        brBefore: true,
      },
      {
        title: 'Создать альбом',
        Icon: MdLibraryMusic,
        handler: getOpenModal('isCreateAlbum'),
      },
      {
        title: 'Создать трек',
        Icon: MdAudiotrack,
        handler: getOpenModal('isCreateTrack'),
      },
      {
        title: 'Загрузить фалы',
        Icon: MdUploadFile,
        handler: getOpenModal('isUploadFiles'),
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
        handler: getOpenModal('isSettings'),
        brBefore: true,
      },
      {
        title: 'Изменить доступ',
        Icon: HiOutlineUserAdd,
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Получить ссылку',
        Icon: MdOutlineLink,
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Переместить',
        Icon: MdOutlineDriveFileMove,
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Добавить в отмеченные',
        Icon: MdOutlineBookmarkAdd,
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Переименовать',
        Icon: MdDriveFileRenameOutline,
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Показать своства',
        Icon: BiInfoCircle,
        handler: openIsInfo,
      },
    ],
    []
  );

  const trashCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Востановить',
        Icon: MdRestore,
        handler: () => changeIsTrashHandler(false),
      },
      {
        title: 'Удалить навсегда',
        Icon: BiTrash,
        handler: getOpenModal('isDelete', false),
      },
    ],
    []
  );

  const deleteCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Удалить',
        Icon: BiTrash,
        handler: () => changeIsTrashHandler(true),
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
        handler: getOpenModal('isSettings'),
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
          handler: () => {},
          options: [
            {
              color: FolderColors.GREY,
              handler: () => changeColorHandler(FolderColors.GREY),
            },
            {
              color: FolderColors.BLUE,
              handler: () => changeColorHandler(FolderColors.BLUE),
            },
            {
              color: FolderColors.RED,
              handler: () => changeColorHandler(FolderColors.RED),
            },
            {
              color: FolderColors.YELLOW,
              handler: () => changeColorHandler(FolderColors.YELLOW),
            },
          ],
        },
      ],
      [ItemTypes.FILE]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: getOpenModal('isSettings'),
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: getOpenModal('isSettings'),
        },
      ],
      [ItemTypes.ALBUM]: [
        {
          title: 'Редактироввать',
          Icon: MdSettingsSuggest,
          handler: getOpenModal('isSettings'),
        },
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: getOpenModal('isSettings'),
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: getOpenModal('isSettings'),
        },
      ],
      [ItemTypes.TRACK]: [
        {
          title: 'Редактироввать',
          Icon: MdSettingsSuggest,
          handler: getOpenModal('isSettings'),
        },
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: getOpenModal('isSettings'),
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: getOpenModal('isSettings'),
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
          handler: () => {},
          options: [
            {
              color: FolderColors.GREY,
              handler: () => changeColorHandler(FolderColors.GREY),
            },
            {
              color: FolderColors.BLUE,
              handler: () => changeColorHandler(FolderColors.BLUE),
            },
            {
              color: FolderColors.RED,
              handler: () => changeColorHandler(FolderColors.RED),
            },
            {
              color: FolderColors.YELLOW,
              handler: () => changeColorHandler(FolderColors.YELLOW),
            },
          ],
        },
      ],
      [ItemTypes.FILE]: [
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: getOpenModal('isSettings'),
        },
      ],
      [ItemTypes.ALBUM]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: getOpenModal('isSettings'),
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: getOpenModal('isSettings'),
        },
      ],
      [ItemTypes.TRACK]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: getOpenModal('isSettings'),
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: getOpenModal('isSettings'),
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
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Переместить',
        Icon: MdOutlineDriveFileMove,
        handler: getOpenModal('isSettings'),
      },
      {
        title: 'Добавить в отмеченные',
        Icon: MdOutlineBookmarkAdd,
        handler: getOpenModal('isSettings'),
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
