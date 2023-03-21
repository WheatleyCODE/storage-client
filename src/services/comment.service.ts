import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IComment, ICreateCommentFilds, IDeleteCommentFilds } from 'types';

export class CommentService {
  static async create(filds: ICreateCommentFilds): Promise<AxiosResponse<IComment>> {
    return $api.post<IComment>('/api/commentator/create', filds);
  }

  static async delete(filds: IDeleteCommentFilds): Promise<AxiosResponse<IComment[]>> {
    return $api.post<IComment[]>('/api/commentator/delete', filds);
  }
}
