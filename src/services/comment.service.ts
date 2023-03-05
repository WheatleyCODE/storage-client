import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IComment } from 'types';

export class CommentService {
  // ! Fix
  static async create(filds: any): Promise<AxiosResponse<IComment>> {
    return $api.post<IComment>('/api/commentator/create', filds);
  }

  // ! Fix
  static async delete(filds: any): Promise<AxiosResponse<IComment>> {
    return $api.post<IComment>('/api/commentator/delete', filds);
  }
}
