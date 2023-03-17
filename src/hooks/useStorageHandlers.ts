import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { useActions, useOpenModal, useTypedSelector } from 'hooks';
import { PropertyFactory } from 'helpers';
import { getWorkplaceUrl } from 'utils';
import { FolderColors } from 'types';

export const useStorageHandlers = () => {
  const { changeIsModal } = modalsActions;
  const { currentItems, user } = useTypedSelector((state) => state.storage);
  const { isAside } = useTypedSelector((state) => state.modals);
  const { changeIsTrash, changeColor, copyFiles, downloadAcrhive, changeStar } = useActions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = useOpenModal();

  const currentItem = currentItems[0];
  const items = useMemo(() => currentItems.map(({ id, type }) => ({ id, type })), [currentItems]);

  const openInfo = useCallback(() => {
    if (isAside) {
      dispatch(changeIsModal({ key: 'isAside', boolean: false }));
    }

    dispatch(changeIsModal({ key: 'isInfo', boolean: true }));
  }, [isAside]);

  const openWorkpaceItem = useCallback(() => {
    if (!currentItem) return;

    const itemData = PropertyFactory.create(currentItem);

    if (itemData.openModalStateKey) {
      openModal(itemData.openModalStateKey, false);
      return;
    }

    navigate(getWorkplaceUrl(itemData));
  }, [currentItem]);

  const openChangeModal = useCallback(() => {
    if (!currentItem) return;

    const itemData = PropertyFactory.create(currentItem);

    if (itemData.openChangeModalStateKey) {
      openModal(itemData.openChangeModalStateKey, false);
    }
  }, [currentItem]);

  const changeIsTrashHandler = useCallback(
    (isTrash: boolean) => {
      changeIsTrash({
        items,
        isTrash,
        prevIsTrash: !isTrash,
        isCanRestore: true,
      });
    },
    [items]
  );

  const changeStared = useCallback(
    (isStar: boolean) => {
      changeStar({
        items,
        isStar,
        user,
      });
    },
    [items, user]
  );

  const changeColorHandler = useCallback(
    (color: FolderColors) => {
      changeColor({
        items,
        color,
      });
    },
    [items]
  );

  const copyFilesHandler = useCallback(() => {
    copyFiles({
      items,
    });
  }, [items]);

  const downloadArchiveHandler = useCallback(() => {
    downloadAcrhive({
      items,
    });
  }, [items]);

  return {
    openModal,
    changeIsTrashHandler,
    changeColorHandler,
    copyFilesHandler,
    openInfo,
    openWorkpaceItem,
    openChangeModal,
    downloadArchiveHandler,
    changeStared,
  };
};
