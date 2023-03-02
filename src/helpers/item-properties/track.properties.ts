import { ITrack, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class TrackProperties extends DefaultProperties implements IProperties {
  description: string | null;
  text: string | null;
  author: string | null;

  constructor(private track: ITrack) {
    super(track);
    this.description = null;
    this.text = this.track.text;
    this.author = this.track.author;
  }

  getFilePath(): string | null {
    return this.track.file;
  }

  getImagePath(): string | null {
    return this.track.image;
  }

  getSize(): number {
    return this.track.fileSize + this.track.imageSize;
  }
}
