import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store';
import { MainLayout } from 'components';
import { routes } from 'routes';
import './App.scss';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.Page />} />
              ))}
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
