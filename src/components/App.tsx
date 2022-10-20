import React, { FC, useEffect, lazy, Suspense } from 'react';
import { Notifier, AppLoader, Portal } from 'components';
import { useActions, useTypedSelector } from 'hooks';

const AuthChunk = lazy(() => import('./chunks/AuthChunk'));
const NoAuthChunk = lazy(() => import('./chunks/NoAuthChunk'));

export const App: FC = () => {
  const { isAuth, loadNoAuthChunk, isLoading } = useTypedSelector((state) => state.auth);
  const { checkAuth } = useActions();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Suspense>
      {isAuth && <AuthChunk />}
      {!isAuth && loadNoAuthChunk && <NoAuthChunk />}

      <Notifier />

      {isLoading && (
        <Portal>
          <AppLoader />
        </Portal>
      )}
    </Suspense>
  );
};
