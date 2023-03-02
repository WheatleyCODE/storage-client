import { IItem } from './item.interface';

export interface ITrack extends IItem {
  author: string;
  text: string;
  image: string;
  imageSize: number;
  file: string;
  fileSize: number;
}

export interface ICreateTrackFilds {
  readonly name: string;
  readonly author: string;
  readonly text: string;
  readonly parent?: string;
  readonly album?: string;
  readonly audio: File;
  readonly image?: File;
}
