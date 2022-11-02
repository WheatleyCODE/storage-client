import { AxiosResponse } from 'axios';
import { ICreateFolderFilds, IFolder, IStorageState } from 'types';
import { $api } from '../api';

export class StorageService {
  static async fetchStorage(): Promise<AxiosResponse<IStorageState>> {
    return $api.get<IStorageState>('/api/storage');
  }

  static async createFolder(filds: ICreateFolderFilds): Promise<AxiosResponse<IFolder>> {
    return $api.post<IFolder>('/api/storage/create/folder', filds);
  }
}
