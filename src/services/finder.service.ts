import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IServerItemData } from 'types';

export class FinderService {
  static async searchItems(text: string): Promise<AxiosResponse<IServerItemData[]>> {
    return $api.post<IServerItemData[]>('/api/finder/storage/items', { text });
  }
}
