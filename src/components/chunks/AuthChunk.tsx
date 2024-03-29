import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { StoragePageLayout } from 'components';
import { authRoutes } from 'routes';
import { PathRoutes } from 'types';

export const AuthChunk: FC = () => {
  return (
    <Routes>
      <Route element={<StoragePageLayout />}>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.Page />} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={PathRoutes.STORAGE_MY_DRIVE} replace />} />
    </Routes>
  );
};

export default AuthChunk;
