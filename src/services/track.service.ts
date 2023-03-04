import { $api } from 'api';
import { AxiosResponse } from 'axios';
import {
  IChangeTrackDataFilds,
  IChangeTrackFileFilds,
  IChangeTrackImageFilds,
  ICreateTrackFilds,
  ISearchPublicTrackFilds,
  ITrack,
} from 'types';

export class TrackService {
  static async create(filds: ICreateTrackFilds): Promise<AxiosResponse<ITrack>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<ITrack>('/api/track/create', formData);
  }

  static async changeFile(filds: IChangeTrackFileFilds): Promise<AxiosResponse<ITrack>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<ITrack>('/api/track/change/file', formData);
  }

  static async changeImage(filds: IChangeTrackImageFilds): Promise<AxiosResponse<ITrack>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<ITrack>('/api/track/change/image', formData);
  }

  static async changeData(filds: IChangeTrackDataFilds): Promise<AxiosResponse<ITrack>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<ITrack>('/api/track/change/data', formData);
  }

  static async getAllPublic(count: number, offset: number): Promise<AxiosResponse<ITrack[]>> {
    return $api.get<ITrack[]>(`/api/track/public?count=${count}&offset=${offset}`);
  }

  static async searchPublic(filds: ISearchPublicTrackFilds): Promise<AxiosResponse<ITrack[]>> {
    return $api.post<ITrack[]>('/api/track/search', filds);
  }
}
