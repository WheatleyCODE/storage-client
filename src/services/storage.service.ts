import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { ISettingsData, IStorageData } from 'types';

export class StorageService {
  static async fetchStorage(): Promise<AxiosResponse<IStorageData>> {
    return $api.get<IStorageData>('/api/storage');
  }

  static async changeSettings(data: ISettingsData): Promise<AxiosResponse<IStorageData>> {
    return $api.post<IStorageData>('/api/storage/change/settings', data);
  }
}
