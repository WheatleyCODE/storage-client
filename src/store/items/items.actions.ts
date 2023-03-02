import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { ItemsService } from 'services';
import { getActionMessage } from 'helpers';
// import { createChangeIsTrashMessage } from 'utils';
import {
  IChangeAccessTypeFilds,
  IChangeAccessTypeRestore,
  IChangeIsTrashFilds,
  IChangeIsTrashRestore,
  IChangeNameFilds,
  IChangeNameRestore,
  IChangeParentFilds,
  IChangeParentRestore,
  ICopyFilesFilds,
  IDeleteItemsFilds,
  IItemFilds,
  IStorageData,
  RestoreActionNames,
  WorkplaceItem,
} from 'types';

export const deleteItems = createAsyncThunk<IStorageData, IDeleteItemsFilds>(
  'storage/deleteItems',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.deleteItems(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Удалено (Нужна генерация)',
        })
      );

      thunkAPI.dispatch(storageActions.deleteItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeIsTrash = createAsyncThunk<
  WorkplaceItem[],
  IChangeIsTrashFilds & IChangeIsTrashRestore
>('storage/changeIsTrashServer', async (filds, thunkAPI) => {
  try {
    const { items, isTrash, isCanRestore, prevIsTrash } = filds;
    const { data } = await ItemsService.changeIsTrash({ items, isTrash });

    if (!isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Действие отменено',
        })
      );
    }

    if (isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'createChangeIsTrashMessage(filds)',
          restoreActionName: RestoreActionNames.CHANGE_IS_THASH,
          restoreParams: { ...filds, isTrash: prevIsTrash, isCanRestore: false },
        })
      );
    }

    thunkAPI.dispatch(storageActions.setItems(data));
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const changeName = createAsyncThunk<WorkplaceItem, IChangeNameFilds & IChangeNameRestore>(
  'storage/changeName',
  async (filds, thunkAPI) => {
    try {
      const { id, name, type, isCanRestore, prevName } = filds;
      const { data } = await ItemsService.changeName({ id, name, type });

      if (!isCanRestore) {
        thunkAPI.dispatch(
          getActionMessage({
            color: 'default',
            text: 'Переименование отменено',
          })
        );
      }

      if (isCanRestore) {
        thunkAPI.dispatch(
          getActionMessage({
            color: 'default',
            text: 'Имя изменено',
            restoreActionName: RestoreActionNames.CHANGE_NAME,
            restoreParams: { ...filds, name: prevName, isCanRestore: false },
          })
        );
      }

      thunkAPI.dispatch(storageActions.setItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeParent = createAsyncThunk<
  WorkplaceItem[],
  IChangeParentFilds & IChangeParentRestore
>('storage/changeParent', async (filds, thunkAPI) => {
  try {
    const { items, parent, isCanRestore, prevParent } = filds;
    const { data } = await ItemsService.changeParent({ items, parent });

    if (!isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Перемещение отменено',
        })
      );
    }

    if (isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Перемещение',
          restoreActionName: RestoreActionNames.CHANGE_PARENT,
          restoreParams: { ...filds, parent: prevParent, isCanRestore: false },
        })
      );
    }

    thunkAPI.dispatch(storageActions.setItems(data));
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const createAccessLink = createAsyncThunk<WorkplaceItem, IItemFilds>(
  'storage/createAccessLink',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.createAccessLink(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Ссылка создана',
        })
      );

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeAccessType = createAsyncThunk<
  WorkplaceItem,
  IChangeAccessTypeFilds & IChangeAccessTypeRestore
>('storage/changeAccessType', async (filds, thunkAPI) => {
  try {
    const { id, type, accessType, prevAccessType, isCanRestore } = filds;
    const { data } = await ItemsService.changeAccessType({ id, type, accessType });

    if (!isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Изменение типа доступа отменено',
        })
      );
    }

    if (isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Тип доступа изменен',
          restoreActionName: RestoreActionNames.CHANGE_ACCESS_TYPE,
          restoreParams: { ...filds, accessType: prevAccessType, isCanRestore: false },
        })
      );
    }

    thunkAPI.dispatch(storageActions.setItems([data]));
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const copyFiles = createAsyncThunk<WorkplaceItem[], ICopyFilesFilds>(
  'storage/copyFiles',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.copyFiles(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Копирование файлов',
        })
      );

      thunkAPI.dispatch(storageActions.addItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
