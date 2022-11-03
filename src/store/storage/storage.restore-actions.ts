import { RestoreActionNames } from 'types';
import { changeIsTrash } from './storage.actions';

export const restoreAsyncThunks = {
  [RestoreActionNames.CHANGE_IS_THASH]: changeIsTrash,
};
