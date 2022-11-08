import { AxiosResponse } from 'axios';
import {
  IChangeAccessTypeFilds,
  IChangeColorFilds,
  IChangeIsTrashFilds,
  IChangeNameFilds,
  IChangeParentFilds,
  IChildrensData,
  ICreateFolderFilds,
  IDeleteItemsFilds,
  IFolder,
  IItemFilds,
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
}
