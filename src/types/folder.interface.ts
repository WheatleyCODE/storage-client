import { IItem } from './item.interface';
import { IItemFilds } from './storage-workplace.intarface';

export enum FolderColors {
  GREY = 'GREY',
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export interface IFolder extends IItem {
  color: FolderColors;
  folderSize: number;
}

export interface ICreateFolderFilds {
  readonly name: string;
  readonly parent?: string;
}

export interface IChangeColorFilds {
  items: IItemFilds[];
  color: FolderColors;
}
