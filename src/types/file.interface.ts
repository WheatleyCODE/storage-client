import { IItem } from './item.interface';

export interface IFile extends IItem {
  file: string;
  fileSize: number;
  fileExt: string;
}

export interface IUploadFilesFilds {
  files: File[];
  parent?: string;
}
