import { AccessTypes, ItemTypes } from './storage-workplace.intarface';

export interface IVideo {
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
  description: string;
  image: string;
  imageSize: number;
  video: string;
  videoSize: number;
}

export interface ICreateTrackFilds {
  readonly name: string;
  readonly description: string;
  readonly parent?: string;
  readonly video: File;
  readonly image?: File;
}
