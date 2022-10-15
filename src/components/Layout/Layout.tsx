import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PathRoutes } from 'types';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import './Layout.scss';

export const Layout = () => {
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
