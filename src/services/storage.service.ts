import { ThunkDispatch } from '@reduxjs/toolkit';
import * as uuid from 'uuid';
import { AxiosResponse } from 'axios';
import { uploaderActions } from 'store';
import { downloadTrigger } from 'utils';
import {
  IAlbum,
  IChangeAccessTypeFilds,
  IChangeColorFilds,
  IChangeIsTrashFilds,
  IChangeNameFilds,
  IChangeParentFilds,
  IChildrensData,
  ICopyFilesFilds,
  ICreateAlbumFilds,
  ICreateFolderFilds,
  ICreateTrackFilds,
  ICreateVideoFilds,
  IDeleteItemsFilds,
  IDownloadArchiveFilds,
  IDownloadFileFilds,
  IFolder,
  IItemFilds,
  IStorageData,
  ITrack,
  IUploadFilesFilds,
  IVideo,
  WorkplaceItem,
} from 'types';
import { $api } from '../api';

export class StorageService {
  static async fetchStorage(): Promise<AxiosResponse<IStorageData>> {
    return $api.get<IStorageData>('/api/storage');
  }

  static async createFolder(filds: ICreateFolderFilds): Promise<AxiosResponse<IFolder>> {
    return $api.post<IFolder>('/api/storage/create/folder', filds);
  }

  static async createTrack(filds: ICreateTrackFilds): Promise<AxiosResponse<ITrack>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<ITrack>('/api/storage/create/track', formData);
  }

  static async createAlbum(filds: ICreateAlbumFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IAlbum>('/api/storage/create/album', formData);
  }

  static async createVideo(filds: ICreateVideoFilds): Promise<AxiosResponse<IVideo>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IVideo>('/api/storage/create/video', formData);
  }

  static async changeIsTrash(filds: IChangeIsTrashFilds): Promise<AxiosResponse<WorkplaceItem[]>> {
    return $api.post<WorkplaceItem[]>('/api/storage/change/trash', filds);
  }

  static async deleteItems(filds: IDeleteItemsFilds): Promise<AxiosResponse<IStorageData>> {
    return $api.post<IStorageData>('/api/storage/delete/items', filds);
  }

  static async changeColor(filds: IChangeColorFilds): Promise<AxiosResponse<IFolder[]>> {
    return $api.post<IFolder[]>('/api/storage/change/color', filds);
  }

  static async changeName(filds: IChangeNameFilds): Promise<AxiosResponse<WorkplaceItem>> {
    return $api.post<WorkplaceItem>('/api/storage/change/name', filds);
  }

  static async changeParent(filds: IChangeParentFilds): Promise<AxiosResponse<WorkplaceItem[]>> {
    return $api.post<WorkplaceItem[]>('/api/storage/change/parent', filds);
  }

  static async createAccessLink(filds: IItemFilds): Promise<AxiosResponse<WorkplaceItem>> {
    return $api.post<WorkplaceItem>('/api/storage/create/access-link', filds);
  }

  static async changeAccessType(
    filds: IChangeAccessTypeFilds
  ): Promise<AxiosResponse<WorkplaceItem>> {
    return $api.post<WorkplaceItem>('/api/storage/change/access', filds);
  }

  static async getChildrens(id: string): Promise<AxiosResponse<IChildrensData>> {
    return $api.get<IChildrensData>(`/api/storage/childrens/${id}`);
  }

  static async searchItems(text: string): Promise<AxiosResponse<WorkplaceItem[]>> {
    return $api.post<WorkplaceItem[]>('/api/storage/search/items', { text });
  }

  static async uploadFiles(
    filds: IUploadFilesFilds,
    dispatch: ThunkDispatch<any, any, any>
  ): Promise<AxiosResponse<WorkplaceItem[]>> {
    const formData: any = new FormData();
    filds.files.forEach((file) => formData.append('files', file));

    if (filds.parent) {
      formData.append('parent', filds.parent);
    }

    return $api.post<WorkplaceItem[]>('/api/storage/upload/files', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent?.progress?.toFixed(2) || 0;
        dispatch(uploaderActions.setProgress(Math.floor(+progress * 100)));
      },
    });
  }

  static async copyFiles(filds: ICopyFilesFilds): Promise<AxiosResponse<WorkplaceItem[]>> {
    return $api.post<WorkplaceItem[]>('/api/storage/copy/files', filds);
  }

  static async downloadArchive(filds: IDownloadArchiveFilds): Promise<void> {
    const res = await $api.post<Blob>('/api/storage/download/archive', filds, {
      responseType: 'blob',
    });

    const { filename } = res.headers;
    const { data } = res;

    downloadTrigger(data, filename || uuid.v4());
  }

  static async downloadFile(filds: IDownloadFileFilds): Promise<void> {
    const res = await $api.post<Blob>('/api/storage/download/file', filds, {
      responseType: 'blob',
    });

    const { filename } = res.headers;
    const { data } = res;

    downloadTrigger(data, filename || uuid.v4());
  }
}
