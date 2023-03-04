import { $api } from 'api';
import { AxiosResponse } from 'axios';
import {
  IChangeAccessTypeFilds,
  IChangeIsTrashFilds,
  IChangeNameFilds,
  IChangeParentFilds,
  IChildrensData,
  ICopyFilesFilds,
  IDeleteItemsFilds,
  IItemFilds,
  IStorageData,
  IServerItemData,
} from 'types';

export class ItemsService {
  static async changeIsTrash(
    filds: IChangeIsTrashFilds
  ): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.post<IServerItemData[]>('/api/items/change/trash', filds);
  }

  static async deleteItems(filds: IDeleteItemsFilds): Promise<AxiosResponse<IStorageData>> {
    return $api.post<IStorageData>('/api/items/delete', filds);
  }

  static async changeName(filds: IChangeNameFilds): Promise<AxiosResponse<IServerItemData>> {
    return $api.post<IServerItemData>('/api/items/change/name', filds);
  }

  static async changeParent(filds: IChangeParentFilds): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.post<IServerItemData[]>('/api/items/change/parent', filds);
  }

  static async createAccessLink(filds: IItemFilds): Promise<AxiosResponse<IServerItemData>> {
    return $api.post<IServerItemData>('/api/items/create/access-link', filds);
  }

  static async changeAccessType(
    filds: IChangeAccessTypeFilds
  ): Promise<AxiosResponse<IServerItemData>> {
    return $api.post<IServerItemData>('/api/items/change/access-type', filds);
  }

  static async getChildrens(id: string): Promise<AxiosResponse<IChildrensData>> {
    return $api.get<IChildrensData>(`/api/items/childrens/${id}`);
  }

  static async copyFiles(filds: ICopyFilesFilds): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.post<IServerItemData[]>('/api/items/copy', filds);
  }
}
