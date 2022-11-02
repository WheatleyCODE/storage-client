import React, { FC, useEffect, lazy, Suspense, useCallback } from 'react';
import { Notifier } from 'components';
import { useActions, useTypedDispatch, useTypedSelector } from 'hooks';
import { checkToken } from 'utils';
import { authActions } from 'store';

const AuthChunk = lazy(() => import('./chunks/AuthChunk'));
const NoAuthChunk = lazy(() => import('./chunks/NoAuthChunk'));

export const App: FC = () => {
  const { isAuth, loadNoAuthChunk } = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();
  const { checkAuth } = useActions();

  const checkHandler = useCallback(async () => {
    if (checkToken()) {
      await checkAuth();
    }

    dispatch(authActions.setLoadNoAuthChunk(true));
  }, []);

  useEffect(() => {
    checkHandler();
  }, []);

  return (
    <Suspense>
      {isAuth && <AuthChunk />}
      {!isAuth && loadNoAuthChunk && <NoAuthChunk />}
      <Notifier />
    </Suspense>
  );
};
