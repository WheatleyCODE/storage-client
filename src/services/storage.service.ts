import { AxiosResponse } from 'axios';
import { IStorageState } from 'types';
import { $api } from '../api';

export class StorageService {
  static async fetchStorage(): Promise<AxiosResponse<IStorageState>> {
    return $api.get<IStorageState>('/api/storage');
  }
}
