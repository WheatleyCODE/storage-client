import React, { FC, useEffect, lazy, Suspense } from 'react';
import { Notifier } from 'components';
import { useActions, useTypedSelector } from 'hooks';

const AuthChunk = lazy(() => import('./chunks/AuthChunk'));
const NoAuthChunk = lazy(() => import('./chunks/NoAuthChunk'));

export const App: FC = () => {
  const { isAuth, loadNoAuthChunk } = useTypedSelector((state) => state.auth);
  const { checkAuth } = useActions();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Suspense>
      {isAuth && <AuthChunk />}
      {!isAuth && loadNoAuthChunk && <NoAuthChunk />}

      <Notifier />
    </Suspense>
  );
};
