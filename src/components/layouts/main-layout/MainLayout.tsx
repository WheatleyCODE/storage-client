import React, { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PathRoutes } from 'types';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import './MainLayout.scss';

export const MainLayout: FC = () => {
  const location = useLocation();
  const isFooter = location.pathname === PathRoutes.HOME;

  return (
    <>
      <Header />
      <Outlet />
      {isFooter && <Footer />}
    </>
  );
};
