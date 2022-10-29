import * as authActions from './auth/auth.actions';
import * as storageActions from './storage/storage.actions';

export const rootActions = {
  ...authActions,
  ...storageActions,
};
