import { IImage, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class ImageProperties extends DefaultProperties implements IProperties {
  description: string | null;
  text: string | null;
  author: string | null;

  constructor(private image: IImage) {
    super(image);
    this.description = null;
    this.text = null;
    this.author = null;
  }

  getFilePath(): string | null {
    return this.image.file;
  }

  getImagePath(): string | null {
    return this.image.file;
  }

  getSize(): number {
    return this.image.fileSize;
  }
}
