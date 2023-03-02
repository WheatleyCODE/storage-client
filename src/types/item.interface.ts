import { AccessTypes, ItemTypes } from './storage-workplace.intarface';

export interface IItem {
  id: string;
  user: string;
  type: ItemTypes;
  name: string;
  parent: string;
  isTrash: boolean;
  likeCount: number;
  likedUsers: any[]; // !
  listenCount: number;
  starredCount: number;
  accessType: AccessTypes;
  accessLink: string;
  createDate: number;
  changeDate: number;
  openDate: number;
  comments: any[];
}
