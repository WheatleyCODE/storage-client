import { MainLayout } from 'components/layouts/main-layout/MainLayout';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { noAuthRoutes } from 'routes';
import { PathRoutes } from 'types';

const NoAuthChunk: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {noAuthRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.Page />} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={PathRoutes.HOME} replace />} />
    </Routes>
  );
};

export default NoAuthChunk;
