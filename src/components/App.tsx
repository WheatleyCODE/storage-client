import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { MainLayout, Notifier } from 'components';
import { noAuthRoutes } from 'routes';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {noAuthRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.Page />} />
            ))}
          </Route>
        </Routes>
        <Notifier />
      </Provider>
    </BrowserRouter>
  );
};
