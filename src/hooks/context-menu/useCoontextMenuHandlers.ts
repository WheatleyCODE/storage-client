import { stateKeysToHashModals } from 'consts';
import { useTypedSelector, useActions, useTypedDispatch } from 'hooks';
import { useLocation, useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { FolderColors, ModalsStateKeys } from 'types';
import { getWorkplaceUrl } from 'utils';

export const useContextMenuHandlers = () => {
  const { currentItems } = useTypedSelector((state) => state.storage);
  const { isAside } = useTypedSelector((state) => state.modals);
  const { changeIsModal } = modalsActions;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { changeIsTrash, changeColor } = useActions();
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

  return {
    getOpenModal,
    changeIsTrashHandler,
    changeColorHandler,
    openIsInfo,
    openWorkpaceItem,
  };
};
