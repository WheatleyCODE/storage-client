import { IFolder, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class FolderProperties extends DefaultProperties implements IProperties {
  description: string | null;
  text: string | null;
  author: string | null;

  constructor(private folder: IFolder) {
    super(folder);
    this.description = null;
    this.text = null;
    this.author = null;
  }

  getFilePath(): string | null {
    return null;
  }

  getImagePath(): string | null {
    return null;
  }

  getSize(): number {
    return 0;
  }
}
