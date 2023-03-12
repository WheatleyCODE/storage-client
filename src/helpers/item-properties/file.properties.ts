import { IFile, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class FileProperties extends DefaultProperties implements IProperties {
  constructor(private file: IFile) {
    super(file);
    this.fileExt = file.fileExt;
  }

  getFilePath(): string | null {
    return this.file.file;
  }

  getImagePath(): string | null {
    return null;
  }

  getSize(): number {
    return this.file.fileSize;
  }
}
