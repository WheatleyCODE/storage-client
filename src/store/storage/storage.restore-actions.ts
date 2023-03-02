import { changeIsTrash, changeName, changeParent, changeAccessType } from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RestoreActionNames } from 'types';

export type AsyncThunk = ReturnType<typeof createAsyncThunk<any, any>>;

export const restoreAsyncThunks = {
  [RestoreActionNames.CHANGE_IS_THASH]: changeIsTrash as AsyncThunk,
  [RestoreActionNames.CHANGE_NAME]: changeName as AsyncThunk,
  [RestoreActionNames.CHANGE_PARENT]: changeParent as AsyncThunk,
  [RestoreActionNames.CHANGE_ACCESS_TYPE]: changeAccessType as AsyncThunk,
};
