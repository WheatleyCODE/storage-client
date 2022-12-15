import { stateKeysToHashModals } from 'consts';
import { useTypedSelector, useActions, useTypedDispatch } from 'hooks';
import { useLocation, useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { FolderColors, ItemTypes, ModalsStateKeys } from 'types';
import { getWorkplaceUrl } from 'utils';

export const useContextMenuHandlers = () => {
  const { currentItems } = useTypedSelector((state) => state.storage);
  const { isAside } = useTypedSelector((state) => state.modals);
  const { changeIsModal } = modalsActions;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { changeIsTrash, changeColor, copyFiles, downloadFile, downloadAcrhive } = useActions();
  const dispatch = useTypedDispatch();

  const getOpenModal = (key: ModalsStateKeys, isHash = true) => {
    const hash = stateKeysToHashModals[key];

    if (isHash) {
      return () => {
        navigate(pathname + hash);
        dispatch(changeIsModal({ key, boolean: true }));
      };
    }

    return () => {
      dispatch(changeIsModal({ key, boolean: true }));
    };
  };

  const openWorkpaceItem = () => {
    const item = currentItems[0];
    if (!item) return;

    // ! Fix
    if (item.type === ItemTypes.IMAGE) {
      getOpenModal('isImage')();
      return;
    }

    if (item.type === ItemTypes.VIDEO) {
      getOpenModal('isVideo')();
      return;
    }

    if (item.type === ItemTypes.TRACK) {
      getOpenModal('isTrack')();
      return;
    }

    if (item.type === ItemTypes.ALBUM) {
      getOpenModal('isAlbum')();
      return;
    }

    navigate(getWorkplaceUrl(item));
  };

  const openIsInfo = () => {
    if (isAside) {
      dispatch(changeIsModal({ key: 'isAside', boolean: false }));
    }

    dispatch(changeIsModal({ key: 'isInfo', boolean: true }));
  };

  const changeIsTrashHandler = (isTrash: boolean) => {
    changeIsTrash({
      items: currentItems.map(({ id, type }) => ({ id, type })),
      isTrash,
      prevIsTrash: !isTrash,
      isCanRestore: true,
    });
  };

  const changeColorHandler = (color: FolderColors) => {
    changeColor({
      items: currentItems.map(({ id, type }) => ({ id, type })),
      color,
    });
  };

  const copyFilesHandler = () => {
    copyFiles({
      items: currentItems.map(({ id, type }) => ({ id, type })),
    });
  };

  const downloadFileHandler = () => {
    const arr = currentItems.map(({ id, type }) => ({ id, type }));
    const { id, type } = arr[0];

    downloadFile({
      id,
      type,
    });
  };

  const downloadArchiveHandler = () => {
    downloadAcrhive({
      items: currentItems.map(({ id, type }) => ({ id, type })),
    });
  };

  return {
    getOpenModal,
    changeIsTrashHandler,
    changeColorHandler,
    copyFilesHandler,
    openIsInfo,
    openWorkpaceItem,
    downloadFileHandler,
    downloadArchiveHandler,
  };
};