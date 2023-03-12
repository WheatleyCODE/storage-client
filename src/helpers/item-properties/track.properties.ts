import { ITrack, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class TrackProperties extends DefaultProperties implements IProperties {
  constructor(private track: ITrack) {
    super(track);
    this.text = this.track.text;
    this.author = this.track.author;
    this.fileExt = track.fileExt;
  }

  getFilePath(): string | null {
    return this.track.file;
  }

  getImagePath(): string | null {
    return this.track.image;
  }

  getSize(): number {
    return this.track.fileSize + (this.track.imageSize || 0);
  }
}
