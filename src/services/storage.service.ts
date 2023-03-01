import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IStorageData } from 'types';

export class StorageService {
  static async fetchStorage(): Promise<AxiosResponse<IStorageData>> {
    return $api.get<IStorageData>('/api/storage');
  }
}
