import { AccessTypes, ItemTypes } from './storage-workplace.intarface';

export interface IAlbum {
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
  author: string;
  image: string;
  imageSize: number;
  tracks: any[];
}

export interface ICreateAlbumFilds {
  readonly name: string;
  readonly author: string;
  readonly parent?: string;
  readonly image: File;
}
