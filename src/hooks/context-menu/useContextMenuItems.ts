import { useMemo } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import {
  MdAudiotrack,
  MdVideocam,
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
import { useStorageHandlers } from 'hooks';
import { emitOpenFiles } from 'helpers';
import { FolderColors, ItemTypes } from 'types';

export interface IContextOptions {
  color: FolderColors;
  handler: () => void;
}
export interface IContextMenuItem {
  title: string;
  Icon: IconType;
  handler?: () => void;
  brAfter?: boolean;
  brBefore?: boolean;
  options?: IContextOptions[];
}

export interface IWorkplaceCMI {
  [ItemTypes.FOLDER]: IContextMenuItem[];
  [ItemTypes.FILE]: IContextMenuItem[];
  [ItemTypes.ALBUM]: IContextMenuItem[];
  [ItemTypes.TRACK]: IContextMenuItem[];
  [ItemTypes.IMAGE]: IContextMenuItem[];
  [ItemTypes.VIDEO]: IContextMenuItem[];
}

export const useContextMenuItems = () => {
  const {
    openModal,
    changeIsTrashHandler,
    changeColorHandler,
    openInfo,
    openWorkpaceItem,
    copyFilesHandler,
    downloadArchiveHandler,
    changeStared,
  } = useStorageHandlers();

  const createCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Создать папку',
        Icon: MdOutlineCreateNewFolder,
        handler: () => openModal('isCreateFolder', false),
        brBefore: true,
      },
      {
        title: 'Создать альбом',
        Icon: MdLibraryMusic,
        handler: () => openModal('isCreateAlbum', false),
      },
      {
        title: 'Создать трек',
        Icon: MdAudiotrack,
        handler: () => openModal('isCreateTrack', false),
      },
      {
        title: 'Создать видео',
        Icon: MdVideocam,
        handler: () => openModal('isCreateVideo', false),
        brBefore: true,
      },
      {
        title: 'Загрузить файлы',
        Icon: MdUploadFile,
        handler: emitOpenFiles,
      },
    ],
    []
  );

  const openCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Открыть',
        Icon: MdOutlineOpenWith,
        handler: openWorkpaceItem,
        brBefore: true,
      },
    ],
    []
  );

  const defaultCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Изменить доступ',
        Icon: HiOutlineUserAdd,
        handler: () => openModal('isChangeAccess', false),
      },
      {
        title: 'Получить ссылку',
        Icon: MdOutlineLink,
        handler: () => openModal('isGetLink', false),
      },
      {
        title: 'Переместить',
        Icon: MdOutlineDriveFileMove,
        handler: () => openModal('isChangeParent', false),
      },
      {
        title: 'Добавить в отмеченные',
        Icon: MdOutlineBookmarkAdd,
        handler: () => changeStared(true),
      },
      {
        title: 'Переименовать',
        Icon: MdDriveFileRenameOutline,
        handler: () => openModal('isRename', false),
      },
      {
        title: 'Показать своства',
        Icon: BiInfoCircle,
        handler: openInfo,
      },
      {
        title: 'Скачать',
        Icon: BiDownload,
        handler: downloadArchiveHandler,
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
        handler: () => openModal('isDelete', false),
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
        handler: copyFilesHandler,
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
          handler: copyFilesHandler,
          brAfter: true,
        },
      ],
      [ItemTypes.ALBUM]: [
        {
          title: 'Редактироввать',
          Icon: MdSettingsSuggest,
          handler: () => openModal('isChangeDataAlbum', false),
        },
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: () => openModal('isSettings'),
        },
      ],
      [ItemTypes.TRACK]: [
        {
          title: 'Редактировать',
          Icon: MdSettingsSuggest,
          handler: () => openModal('isChangeDataTrack', false),
        },
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
      ],
      [ItemTypes.IMAGE]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
      ],
      [ItemTypes.VIDEO]: [
        {
          title: 'Редактировать',
          Icon: MdSettingsSuggest,
          handler: () => openModal('isChangeDataVideo', false),
        },
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
      ],
    }),
    [changeColorHandler]
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
          title: 'Скачать МОРЕ',
          Icon: BiDownload,
          handler: downloadArchiveHandler,
        },
      ],
      [ItemTypes.ALBUM]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: downloadArchiveHandler,
        },
      ],
      [ItemTypes.TRACK]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: downloadArchiveHandler,
        },
      ],
      [ItemTypes.IMAGE]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: downloadArchiveHandler,
        },
      ],
      [ItemTypes.VIDEO]: [
        {
          title: 'Создать копию',
          Icon: MdContentCopy,
          handler: copyFilesHandler,
          brAfter: true,
        },
        {
          title: 'Скачать',
          Icon: BiDownload,
          handler: downloadArchiveHandler,
        },
      ],
    }),
    [changeColorHandler]
  );

  const defaultMoreCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Изменить доступ',
        Icon: HiOutlineUserAdd,
        handler: () => openModal('isSettings'),
      },
      {
        title: 'Переместить',
        Icon: MdOutlineDriveFileMove,
        handler: () => openModal('isChangeParent', false),
      },
      {
        title: 'Добавить в отмеченные',
        Icon: MdOutlineBookmarkAdd,
        handler: () => changeStared(true),
      },
      {
        title: 'Скачать',
        Icon: BiDownload,
        handler: downloadArchiveHandler,
      },
    ],
    []
  );

  return {
    createCMI,
    defaultCMI,
    trashCMI,
    deleteCMI,
    openCMI,
    copyCMI,
    workplaceCMI,
    workplaceMoreCMI,
    defaultMoreCMI,
  };
};
