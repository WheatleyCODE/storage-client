import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
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
import { useActions, useTypedDispatch, useTypedSelector } from 'hooks';
import { modalsActions } from 'store';
import { ItemTypes, ModalsStateKeys } from 'types';
import { stateKeysToHashModals } from 'consts';

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
  const { currentItems } = useTypedSelector((state) => state.storage);
  const { changeIsModal } = modalsActions;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, changeIsTrash } = useActions();
  const dispatch = useTypedDispatch();

  const getOpen = (key: ModalsStateKeys) => {
    const hash = stateKeysToHashModals[key];

    return () => {
      navigate(pathname + hash);
      dispatch(changeIsModal({ key, boolean: true }));
    };
  };

  const changeIsTrashHandler = (isTrash: boolean) => {
    dispatch(
      changeIsTrash({
        items: currentItems.map(({ id, type }) => ({ id, type })),
        isTrash,
      })
    );
  };

  const createCMI: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'Создать папку',
        Icon: MdOutlineCreateNewFolder,
        handler: getOpen('isCreateFolder'),
        brBefore: true,
      },
      {
        title: 'Создать альбом',
        Icon: MdLibraryMusic,
        handler: getOpen('isCreateAlbum'),
      },
      {
        title: 'Создать трек',
        Icon: MdAudiotrack,
        handler: getOpen('isCreateTrack'),
      },
      {
        title: 'Загрузить фалы',
        Icon: MdUploadFile,
        handler: getOpen('isUploadFiles'),
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
        handler: () => changeIsTrashHandler(false),
      },
      {
        title: 'Удалить навсегда',
        Icon: BiTrash,
        handler: getOpen('isDelete'),
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
