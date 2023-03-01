import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { WorkplaceItem } from 'types';

export class FinderService {
  static async searchItems(text: string): Promise<AxiosResponse<WorkplaceItem[]>> {
    return $api.post<WorkplaceItem[]>('/api/finder/storage/items', { text });
  }
}
