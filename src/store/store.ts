import { configureStore } from '@reduxjs/toolkit';
import { errorMiddleware } from './middlewares/error.middleware';
import { restoreMiddleware } from './middlewares/restore.middleware';
import { rootReducer } from './root-reducer';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(errorMiddleware, restoreMiddleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type TypedStore = ReturnType<typeof setupStore>;
export type TypedDispatch = TypedStore['dispatch'];
