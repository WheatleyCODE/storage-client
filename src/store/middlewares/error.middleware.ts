import { getActionMessage } from 'helpers';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { checkAuth } from 'store/auth/auth.actions';

export const errorMiddleware: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.type === checkAuth.rejected.type) {
      return next(action);
    }

    api.dispatch(getActionMessage({ color: 'red', text: action.payload, isRestore: false }));
  }

  return next(action);
};
