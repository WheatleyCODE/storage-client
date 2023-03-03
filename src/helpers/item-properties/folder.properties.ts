import { FolderColors, IFolder, IProperties } from 'types';
import { DefaultProperties } from './default.properties';

export class FolderProperties extends DefaultProperties implements IProperties {
  constructor(private folder: IFolder) {
    super(folder);
    this.color = this.folder.color;
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
