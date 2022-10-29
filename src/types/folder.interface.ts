import { ItemTypes, AccessTypes } from './storage-workplace.intarface';

export enum FolderColors {
  GREY = 'GREY',
  RED = 'RED',
  BLUE = 'BLUE',
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
}
