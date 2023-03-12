import { IAlbum, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class AlbumProperties extends DefaultProperties implements IProperties {
  constructor(private album: IAlbum) {
    super(album);
    this.author = this.album.author;
    this.tracks = [...this.album.tracks];
  }

  getFilePath(): string | null {
    return null; // ! Fix
  }

  getImagePath(): string | null {
    return this.album.image;
  }

  getSize(): number {
    return this.album.imageSize; // ! Fix
  }
}
