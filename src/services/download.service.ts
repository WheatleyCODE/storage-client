import { $api } from 'api';
import * as uuid from 'uuid';
import { IDownloadArchiveFilds, IDownloadFileFilds } from 'types';
import { downloadTrigger } from 'utils';

export class DownloadService {
  static async downloadArchive(filds: IDownloadArchiveFilds): Promise<void> {
    const res = await $api.post<Blob>('/api/downloader/archive', filds, {
      responseType: 'blob',
    });

    const { filename } = res.headers;
    const { data } = res;

    downloadTrigger(data, filename || uuid.v4());
  }

  static async downloadFile(filds: IDownloadFileFilds): Promise<void> {
    const res = await $api.post<Blob>('/api/downloader/file', filds, {
      responseType: 'blob',
    });

    const { filename } = res.headers;
    const { data } = res;

    downloadTrigger(data, filename || uuid.v4());
  }
}
