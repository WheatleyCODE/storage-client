import { MainLayout } from 'components/layouts/main-layout/MainLayout';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { authRoutes } from 'routes';
import { PathRoutes } from 'types';

export const AuthChunk: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.Page />} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={PathRoutes.STORAGE} replace />} />
    </Routes>
  );
};

export default AuthChunk;
