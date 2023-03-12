import { DefaultProperties } from 'helpers/item-properties/default.properties';
import { FolderColors } from './folder.interface';
import { AccessTypes, ItemTypes } from './storage-workplace.intarface';
import { ITrack } from './track.interface';

export interface IProperties {
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
  accessLink: string;
  createDate: number;
  changeDate: number;
  openDate: number;
  comments: any[];
  fileExt: string | null;
  color: FolderColors | null;
  description: string | null;
  text: string | null;
  author: string | null;
  tracks: ITrack[] | null;
  getFilePath: () => string | null;
  getImagePath: () => string | null;
  getSize: () => number;
}

export type IClientItemData = DefaultProperties & IProperties;
