import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, AppProvider } from 'components';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <AppProvider>
    <App />
  </AppProvider>
);
