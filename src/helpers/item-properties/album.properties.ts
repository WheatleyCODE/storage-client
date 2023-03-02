import { IAlbum, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class AlbumProperties extends DefaultProperties implements IProperties {
  description: string | null;
  text: string | null;
  author: string | null;

  constructor(private album: IAlbum) {
    super(album);
    this.description = null;
    this.text = null;
    this.author = this.album.author;
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
