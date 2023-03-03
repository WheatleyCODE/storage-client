import { IImage, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class ImageProperties extends DefaultProperties implements IProperties {
  constructor(private image: IImage) {
    super(image);
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
