import { IItem } from './item.interface';

export interface IImage extends IItem {
  file: string;
  fileSize: number;
}
