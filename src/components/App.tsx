import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MainLayout, Notifier } from 'components';
import { authRoutes, noAuthRoutes } from 'routes';
import { PathRoutes } from 'types';
import { useActions, useTypedSelector } from 'hooks';
import { checkToken } from 'utils';

export const App: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { checkAuth } = useActions();

  useEffect(() => {
    if (checkToken() && !isAuth) {
      checkAuth();
    }

    if (isAuth) {
      navigate(PathRoutes.STORAGE);
    }
  }, [isAuth]);

  const routes = isAuth ? authRoutes : noAuthRoutes;

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.Page />} />
          ))}

          {isAuth ? (
            <Route path="*" element={<Navigate to={PathRoutes.STORAGE} replace />} />
          ) : (
            <Route path="*" element={<Navigate to={PathRoutes.HOME} replace />} />
          )}
        </Route>
      </Routes>
      <Notifier />
    </>
  );
};
