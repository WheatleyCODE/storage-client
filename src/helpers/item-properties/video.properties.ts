import { IVideo, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class VideoProperties extends DefaultProperties implements IProperties {
  description: string | null;
  text: string | null;
  author: string | null;

  constructor(private video: IVideo) {
    super(video);
    this.description = this.video.description;
    this.text = null;
    this.author = null;
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
