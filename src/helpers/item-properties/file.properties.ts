import { IFile, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class FileProperties extends DefaultProperties implements IProperties {
  description: string | null;
  text: string | null;
  author: string | null;

  constructor(private file: IFile) {
    super(file);
    this.description = null;
    this.text = null;
    this.author = null;
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
