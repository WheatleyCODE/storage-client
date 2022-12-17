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
  IChildrensData,
  ITrack,
  ICreateTrackFilds,
  IAlbum,
  ICreateAlbumFilds,
  ISettingsData,
  IStorageSettings,
  IUploadFilesFilds,
  ICopyFilesFilds,
  IDownloadFileFilds,
  IDownloadArchiveFilds,
  IVideo,
  ICreateVideoFilds,
} from 'types';
import { getActionMessage } from 'helpers';
import { storageActions as SA } from 'store';
import { CacheData } from 'helpers/cache.helpers';
import { uploaderActions } from 'store/uploader/uploader.slice';
import { IChangeAccessTypeRestore } from 'types/notifier.interfaces';

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

      thunkAPI.dispatch(SA.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const createTrack = createAsyncThunk<ITrack, ICreateTrackFilds>(
  'storage/createTrack',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.createTrack(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создан новый трек: ${data.name}`,
        })
      );

      thunkAPI.dispatch(SA.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const createAlbum = createAsyncThunk<IAlbum, ICreateAlbumFilds>(
  'storage/createAlbum',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.createAlbum(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создан новый альбом: ${data.name}`,
        })
      );

      thunkAPI.dispatch(SA.addItems([data]));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const createVideo = createAsyncThunk<IVideo, ICreateVideoFilds>(
  'storage/createVideo',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.createVideo(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: `Создано новое видео: ${data.name}`,
        })
      );

      thunkAPI.dispatch(SA.addItems([data]));
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
    }

    if (isCanRestore) {
      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: createChangeIsTrashMessage(filds),
          restoreActionName: RestoreActionNames.CHANGE_IS_THASH,
          restoreParams: { ...filds, isTrash: prevIsTrash, isCanRestore: false },
        })
      );
    }

    thunkAPI.dispatch(SA.setItems(data));
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

      thunkAPI.dispatch(SA.setItems(data));
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

      thunkAPI.dispatch(SA.setItems([data]));
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

    thunkAPI.dispatch(SA.setItems(data));
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

      thunkAPI.dispatch(SA.setItems([data]));
      thunkAPI.dispatch(SA.setCurrent([data]));
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

    thunkAPI.dispatch(SA.setItems([data]));
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
  }
});

export const getChildrens = createAsyncThunk<IChildrensData, string>(
  'storage/getChildrens',
  async (string, thunkAPI) => {
    try {
      const cacheData = CacheData.getInstance();
      const dataCache = cacheData.get<IChildrensData>(string);

      if (dataCache) {
        cacheData.set(string, dataCache, 5000);
        return dataCache;
      }

      const { data } = await StorageService.getChildrens(string);
      cacheData.set(string, data, 5000);

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const changeSettings = createAsyncThunk<ISettingsData, IStorageSettings>(
  'storage/changeSettings',
  async (settings, thunkAPI) => {
    try {
      // Todo сделать настройки на сервере и сделать запрос

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Настроки сохранены',
        })
      );

      return settings;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const uploadFiles = createAsyncThunk<WorkplaceItem[], IUploadFilesFilds>(
  'storage/uploadFiles',
  async (filds, thunkAPI) => {
    try {
      thunkAPI.dispatch(uploaderActions.setIsOpen(true));
      thunkAPI.dispatch(uploaderActions.setIsUpload(false));
      thunkAPI.dispatch(uploaderActions.setFileNames(filds.files.map((file) => file.name)));

      const { data } = await StorageService.uploadFiles(filds, thunkAPI.dispatch);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Загрузка завершена',
        })
      );

      thunkAPI.dispatch(uploaderActions.setIsUpload(true));
      thunkAPI.dispatch(SA.addItems(data));

      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const copyFiles = createAsyncThunk<WorkplaceItem[], ICopyFilesFilds>(
  'storage/copyFiles',
  async (filds, thunkAPI) => {
    try {
      const { data } = await StorageService.copyFiles(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Копирование файлов',
        })
      );

      thunkAPI.dispatch(SA.addItems(data));
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const downloadFile = createAsyncThunk<any, IDownloadFileFilds>(
  'storage/downloadFiles',
  async (filds, thunkAPI) => {
    try {
      await StorageService.downloadFile(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Загрузка файла',
        })
      );

      return {};
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);

export const downloadAcrhive = createAsyncThunk<any, IDownloadArchiveFilds>(
  'storage/downloadArhive',
  async (filds, thunkAPI) => {
    try {
      await StorageService.downloadArchive(filds);

      thunkAPI.dispatch(
        getActionMessage({
          color: 'default',
          text: 'Загрузка архива',
        })
      );

      return {};
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message || 'Ошибка');
    }
  }
);
