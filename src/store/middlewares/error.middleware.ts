import { emitMessage } from 'helpers';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { checkAuth } from 'store/auth/auth.actions';

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.type === checkAuth.rejected.type) {
      return next(action);
    }

    emitMessage({
      color: 'red',
      message: action.payload,
    });
  }

  return next(action);
};
