import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IImage } from 'types';

export class FileService {
  static async create(filds: any): Promise<AxiosResponse<IImage>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IImage>('/api/file/create', formData);
  }
}
