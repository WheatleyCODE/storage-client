import { AxiosResponse } from 'axios';
import {
  IChangeColorFilds,
  IChangeIsTrashFilds,
  ICreateFolderFilds,
  IDeleteItemsFilds,
  IFolder,
  IStorageData,
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

  static async changeIsTrash(filds: IChangeIsTrashFilds): Promise<AxiosResponse<WorkplaceItem[]>> {
    return $api.post<WorkplaceItem[]>('/api/storage/change/trash', filds);
  }

  static async deleteItems(filds: IDeleteItemsFilds): Promise<AxiosResponse<IStorageData>> {
    return $api.post<IStorageData>('/api/storage/delete/items', filds);
  }

  static async changeColor(filds: IChangeColorFilds): Promise<AxiosResponse<IFolder[]>> {
    return $api.post<IFolder[]>('/api/storage/change/color', filds);
  }
}
