import { stateKeysToHashModals } from 'consts';
import { useNavigate, useParams } from 'react-router';
import { modalsActions } from 'store';
import { ModalsStateKeys } from 'types';
import { useTypedDispatch } from './redux/useTypedDispatch';

export const useOpenModal = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { pathname } = useParams();

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
