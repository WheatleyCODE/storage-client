import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { ICreateVideoFilds, IVideo } from 'types';

export class VideoService {
  static async createVideo(filds: ICreateVideoFilds): Promise<AxiosResponse<IVideo>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IVideo>('/api/video/create', formData);
  }
}
