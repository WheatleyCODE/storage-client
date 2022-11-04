import { ItemTypes, AccessTypes, IItemFilds } from './storage-workplace.intarface';

export enum FolderColors {
  GREY = 'GREY',
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export interface IFolder {
  id: string;
  user: string;
  type: ItemTypes;
  name: string;
  parent: string;
  isTrash: boolean;
  likeCount: number;
  likedUsers: any[];
  listenCount: number;
  starredCount: number;
  accessType: AccessTypes;
  accesLink: string;
  creationDate: number;
  openDate: number;
  comments: any[];
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
