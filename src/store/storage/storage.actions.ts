import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from 'services';
import { createChangeIsTrashMessage } from 'utils';
import {
  IChangeColorFilds,
  IChangeIsTrashFilds,
  IChangeIsTrashRestore,
  IChangeNameFilds,
  IChangeNameRestore,
  IChangeParentFilds,
  IChangeParentRestore,
  ICreateFolderFilds,
  IDeleteItemsFilds,
  IChangeAccessTypeFilds,
  IFolder,
  IItemFilds,
  IStorageData,
  RestoreActionNames,
  WorkplaceItem,
} from 'types';
import { getActionMessage } from 'helpers';
import { IChangeAccessTypeRestore } from '../../types/notifier.interfaces';

export const fetchStorage = createAsyncThunk<IStorageData>(
  'storage/fetchStorage',
  async (_, thunkAPI) => {
    try {
      const { data } = await StorageService.fetchStorage();

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const createFolder = createAsyncThunk<IFolder, ICreateFolderFilds>(
  'storage/createFolder',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.createFolder(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создана новая папка: ${data.name}`,
        })
      );

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
    const { data } = await StorageService.changeIsTrash({ items, isTrash });

    if (!isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Действие отменено',
        })
      );

      return data;
    }

    thunkAPI.dispatch(
      getActionMessage({
        color: 'default',
        text: createChangeIsTrashMessage(filds),
        restoreActionName: RestoreActionNames.CHANGE_IS_THASH,
        restoreParams: { ...filds, isTrash: prevIsTrash, isCanRestore: false },
      })
    );

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const deleteItems = createAsyncThunk<IStorageData, IDeleteItemsFilds>(
  'storage/deleteItems',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.deleteItems(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Удалено (Нужна генерация)',
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeColor = createAsyncThunk<IFolder[], IChangeColorFilds>(
  'storage/changeColor',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.changeColor(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Цвет изменен',
        })
      );

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeName = createAsyncThunk<WorkplaceItem, IChangeNameFilds & IChangeNameRestore>(
  'storage/changeName',
  async (filds, thunkAPI) => {
    try {
      const { id, name, type, isCanRestore, prevName } = filds;
      const { data } = await StorageService.changeName({ id, name, type });

      if (!isCanRestore) {
        thunkAPI.dispatch(
          getActionMessage({
            color: 'default',
            text: 'Переименование отменено',
          })
        );

        return data;
      }

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Имя изменено',
          restoreActionName: RestoreActionNames.CHANGE_NAME,
          restoreParams: { ...filds, name: prevName, isCanRestore: false },
        })
      );

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
    const { data } = await StorageService.changeParent({ items, parent });

    if (!isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Перемещение отменено',
        })
      );

      return data;
    }

    thunkAPI.dispatch(
      getActionMessage({
        color: 'default',
        text: 'Перемещение',
        restoreActionName: RestoreActionNames.CHANGE_PARENT,
        restoreParams: { ...filds, parent: prevParent, isCanRestore: false },
      })
    );

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const createAccessLink = createAsyncThunk<WorkplaceItem, IItemFilds>(
  'storage/createAccessLink',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.createAccessLink(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Ссылка создана',
        })
      );

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
    const { data } = await StorageService.changeAccessType({ id, type, accessType });

    if (!isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Изменение типа доступа отменено',
        })
      );

      return data;
    }

    thunkAPI.dispatch(
      getActionMessage({
        color: 'default',
        text: 'Тип доступа изменен',
        restoreActionName: RestoreActionNames.CHANGE_ACCESS_TYPE,
        restoreParams: { ...filds, accessType: prevAccessType, isCanRestore: false },
      })
    );

    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});
