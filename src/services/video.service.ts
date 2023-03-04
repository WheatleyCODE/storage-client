import { $api } from 'api';
import { AxiosResponse } from 'axios';
import {
  IChangeVideoDataFilds,
  IChangeVideoFileFilds,
  IChangeVideoImageFilds,
  ICreateVideoFilds,
  ISearchPublicVideoFilds,
  IVideo,
} from 'types';

export class VideoService {
  static async createVideo(filds: ICreateVideoFilds): Promise<AxiosResponse<IVideo>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IVideo>('/api/video/create', formData);
  }

  static async changeFile(filds: IChangeVideoFileFilds): Promise<AxiosResponse<IVideo>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IVideo>('/api/video/change/file', formData);
  }

  static async changeImage(filds: IChangeVideoImageFilds): Promise<AxiosResponse<IVideo>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IVideo>('/api/video/change/image', formData);
  }

  static async changeData(filds: IChangeVideoDataFilds): Promise<AxiosResponse<IVideo>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IVideo>('/api/video/change/data', formData);
  }

  static async getAllPublic(count: number, offset: number): Promise<AxiosResponse<IVideo[]>> {
    return $api.get<IVideo[]>(`/api/video/public?count=${count}&offset=${offset}`);
  }

  static async searchPublic(filds: ISearchPublicVideoFilds): Promise<AxiosResponse<IVideo[]>> {
    return $api.post<IVideo[]>('/api/track/search', filds);
  }
}
