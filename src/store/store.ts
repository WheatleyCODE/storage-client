import { configureStore } from '@reduxjs/toolkit';
import { errorLogger } from './middlewares/error.middleware';
import { rootReducer } from './root-reducer';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorLogger),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type TypedStore = ReturnType<typeof setupStore>;
export type TypedDispatch = TypedStore['dispatch'];
