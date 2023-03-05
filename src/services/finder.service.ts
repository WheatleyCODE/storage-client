import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IServerItemData } from 'types';

export class FinderService {
  static async searchStorageItems(text: string): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.post<IServerItemData[]>('/api/finder/storage/items', { text });
  }

  static async getAllPublic(
    count: number,
    offset: number
  ): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.get<IServerItemData[]>(`/api/finder/public?count=${count}&offset=${offset}`);
  }

  // ! Fix
  static async searchPublic(
    count: number,
    offset: number,
    filds: any
  ): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.post<IServerItemData[]>(
      `/api/finder/search?count=${count}&offset=${offset}`,
      filds
    );
  }
}
