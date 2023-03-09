import React, { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { setAppLoader } from 'helpers';
import { PathRoutes } from 'types';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import './MainLayout.scss';

export const MainLayout: FC = () => {
  const location = useLocation();
  const isFooter = location.pathname === PathRoutes.HOME;

  useEffect(() => {
    setAppLoader(false);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      {isFooter && <Footer />}
    </>
  );
};
