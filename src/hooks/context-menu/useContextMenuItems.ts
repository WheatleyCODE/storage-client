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
import { useStorageHandlers } from 'hooks';
import { emitOpenFiles } from 'helpers';
import { FolderColors, IContextMenuItem, IListCMI, ItemTypes } from 'types';

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
      {
        title: 'Удалить',
        Icon: BiTrash,
        handler: () => changeIsTrashHandler(true),
        brAfter: true,
      },
    ],
    []
  );

  const specialCMI: IListCMI = useMemo(
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
      [ItemTypes.FILE]: [],
      [ItemTypes.ALBUM]: [
        {
          title: 'Редактировать',
          Icon: MdSettingsSuggest,
          handler: () => openModal('isChangeDataAlbum', false),
        },
      ],
      [ItemTypes.TRACK]: [
        {
          title: 'Редактировать',
          Icon: MdSettingsSuggest,
          handler: () => openModal('isChangeDataTrack', false),
        },
      ],
      [ItemTypes.IMAGE]: [],
      [ItemTypes.VIDEO]: [
        {
          title: 'Редактировать',
          Icon: MdSettingsSuggest,
          handler: () => openModal('isChangeDataVideo', false),
        },
      ],
    }),
    []
  );

  const specialMoreCMI: IListCMI = useMemo(
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
      [ItemTypes.FILE]: [],
      [ItemTypes.ALBUM]: [],
      [ItemTypes.TRACK]: [],
      [ItemTypes.IMAGE]: [],
      [ItemTypes.VIDEO]: [],
    }),
    []
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
      {
        title: 'Удалить',
        Icon: BiTrash,
        handler: () => changeIsTrashHandler(true),
        brAfter: true,
      },
    ],
    []
  );

  return {
    createCMI,
    defaultCMI,
    trashCMI,
    openCMI,
    specialCMI,
    specialMoreCMI,
    defaultMoreCMI,
  };
};
