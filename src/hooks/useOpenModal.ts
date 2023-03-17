import { stateKeysToHashModals } from 'consts';
import { useLocation, useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { useTypedDispatch } from 'hooks';
import { ModalsStateKeys } from 'types';

export const useOpenModal = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();

  return (key: ModalsStateKeys, isHash = true) => {
    const hash = stateKeysToHashModals[key];

    if (isHash) {
      navigate(pathname + hash);
      dispatch(modalsActions.changeIsModal({ key, boolean: true }));
      return;
    }

    dispatch(modalsActions.changeIsModal({ key, boolean: true }));
  };
};
