import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { ICreateTrackFilds, ITrack } from 'types';

export class TrackService {
  static async createTrack(filds: ICreateTrackFilds): Promise<AxiosResponse<ITrack>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<ITrack>('/api/track/create', formData);
  }
}
