import { stateKeysToHashModals } from 'consts';
import { useTypedSelector, useActions, useTypedDispatch } from 'hooks';
import { useLocation, useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { FolderColors, ModalsStateKeys } from 'types';

export const useContextMenuHandlers = () => {
  const { currentItems } = useTypedSelector((state) => state.storage);
  const { changeIsModal } = modalsActions;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { changeIsTrash, changeColor } = useActions();
  const dispatch = useTypedDispatch();

  const getOpenModal = (key: ModalsStateKeys) => {
    const hash = stateKeysToHashModals[key];

    return () => {
      navigate(pathname + hash);
      dispatch(changeIsModal({ key, boolean: true }));
    };
  };

  const changeIsTrashHandler = (isTrash: boolean) => {
    changeIsTrash({
      items: currentItems.map(({ id, type }) => ({ id, type })),
      isTrash,
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
  };
};
