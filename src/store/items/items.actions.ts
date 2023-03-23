import { createAsyncThunk } from '@reduxjs/toolkit';
import { storageActions } from 'store';
import { ItemsService } from 'services';
import { getActionMessage } from 'helpers';
import { isManyItems } from 'utils';
import {
  IChangeAccessTypeFilds,
  IChangeIsTrashFilds,
  IChangeNameFilds,
  IChangeParentFilds,
  ICopyFilesFilds,
  IDeleteItemsFilds,
  IItemFilds,
  IStorageData,
  IServerItemData,
  IChangeLikeFilds,
  IChangeStarFilds,
  ItemTypes,
  ITrack,
  IRestoreItemsFilds,
} from 'types';

export const deleteItems = createAsyncThunk<IStorageData, IDeleteItemsFilds>(
  'storage/deleteItems',
  async (filds, thunkAPI) => {
    try {
      const isMany = isManyItems(filds);
      const { data } = await ItemsService.deleteItems(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: isMany ? 'Элементы удалены' : 'Элемент удален',
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.deleteItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeIsTrash = createAsyncThunk<IServerItemData[], IChangeIsTrashFilds>(
  'storage/changeIsTrashServer',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.changeIsTrash(filds);

      thunkAPI.dispatch(storageActions.setItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeName = createAsyncThunk<IServerItemData, IChangeNameFilds>(
  'storage/changeName',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.changeName(filds);

      if (data.type === ItemTypes.TRACK) {
        thunkAPI.dispatch(storageActions.changeAlbumTracks([data as ITrack]));
      }

      thunkAPI.dispatch(storageActions.setItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeParent = createAsyncThunk<IServerItemData[], IChangeParentFilds>(
  'storage/changeParent',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.changeParent(filds);

      thunkAPI.dispatch(storageActions.setItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const createAccessLink = createAsyncThunk<IServerItemData, IItemFilds>(
  'storage/createAccessLink',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.createAccessLink(filds);

      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeAccessType = createAsyncThunk<IServerItemData[], IChangeAccessTypeFilds>(
  'storage/changeAccessType',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.changeAccessType(filds);

      thunkAPI.dispatch(storageActions.setItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const copyFiles = createAsyncThunk<IServerItemData[], ICopyFilesFilds>(
  'storage/copyFiles',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.copyFiles(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Копирование файлов',
          isRestore: false,
        })
      );
      thunkAPI.dispatch(storageActions.addItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeLike = createAsyncThunk<IServerItemData, IChangeLikeFilds>(
  'storage/changeLike',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.changeLike(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: filds.isLike ? 'Лайк поставлен' : 'Лайк удален',
          isRestore: false,
        })
      );
      thunkAPI.dispatch(storageActions.setItems([data]));
      thunkAPI.dispatch(storageActions.setCurrent([data]));
      thunkAPI.dispatch(storageActions.changeLiked({ id: data.id, isLike: filds.isLike }));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeStar = createAsyncThunk<IServerItemData[], IChangeStarFilds>(
  'storage/changeStar',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.changeStar(filds);

      const ids = data.map((item) => item.id);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: filds.isStar ? 'Добавлено в избранное' : 'Удалено из избранного',
          isRestore: false,
        })
      );

      thunkAPI.dispatch(storageActions.setItems(data));
      thunkAPI.dispatch(storageActions.setCurrent(data));
      thunkAPI.dispatch(storageActions.changeStared({ ids, isStar: filds.isStar }));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const restoreItemsReq = createAsyncThunk<IServerItemData[], IRestoreItemsFilds>(
  'storage/restoreItemsReq',
  async (filds, thunkAPI) => {
    try {
      const { data } = await ItemsService.restore(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Действие отменено',
          isRestore: false,
        })
      );

      console.log(data, 'data');

      thunkAPI.dispatch(storageActions.setItems(data));
      thunkAPI.dispatch(storageActions.setCurrent(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
