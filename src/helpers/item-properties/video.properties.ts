import { IVideo, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class VideoProperties extends DefaultProperties implements IProperties {
  constructor(private video: IVideo) {
    super(video);
    this.description = this.video.description;
  }

  getFilePath(): string | null {
    return this.video.file;
  }

  getImagePath(): string | null {
    return this.video.image;
  }

  getSize(): number {
    return this.video.fileSize + this.video.imageSize;
  }
}
