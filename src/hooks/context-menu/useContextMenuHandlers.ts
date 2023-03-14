import { PropertyFactory } from 'helpers';
import { useTypedSelector, useActions, useTypedDispatch, useOpenModal } from 'hooks';
import { useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { FolderColors } from 'types';
import { getWorkplaceUrl } from 'utils';

export const useContextMenuHandlers = () => {
  const { currentItems, user } = useTypedSelector((state) => state.storage);
  const { isAside } = useTypedSelector((state) => state.modals);
  const { changeIsModal } = modalsActions;
  const navigate = useNavigate();
  const { changeIsTrash, changeColor, copyFiles, downloadFile, downloadAcrhive, changeStar } =
    useActions();
  const openModal = useOpenModal();
  const dispatch = useTypedDispatch();

  const openWorkpaceItem = () => {
    const item = currentItems[0];
    if (!item) return;

    const itemData = PropertyFactory.create(item);

    if (itemData.openModalStateKey) {
      openModal(itemData.openModalStateKey, false);
      return;
    }

    navigate(getWorkplaceUrl(itemData));
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

  const changeStared = (isStar: boolean) => {
    changeStar({
      items: currentItems.map(({ id, type }) => ({ id, type })),
      isStar,
      user,
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
    openModal,
    changeIsTrashHandler,
    changeColorHandler,
    copyFilesHandler,
    openIsInfo,
    openWorkpaceItem,
    downloadFileHandler,
    downloadArchiveHandler,
    changeStared,
  };
};
