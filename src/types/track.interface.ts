import { AccessTypes, ItemTypes } from './storage-items.intarface';

export interface ITrack {
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
  text: string;
  image: string;
  imageSize: number;
  audio: string;
  audioSize: number;
}
