import { AccessTypes, ItemTypes } from './storage-items.intarface';

export interface IFile {
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
  file: string;
  fileSize: number;
}
