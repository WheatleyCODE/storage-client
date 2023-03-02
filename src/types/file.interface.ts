import { IItem } from './item.interface';

export interface IFile extends IItem {
  file: string;
  fileSize: number;
}

export interface IUploadFilesFilds {
  readonly files: File[];
  parent?: string;
}
