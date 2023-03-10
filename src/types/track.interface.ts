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

export interface IChangeTrackFileFilds {
  readonly id: string;
  readonly audio: File;
}

export interface IChangeTrackImageFilds {
  readonly id: string;
  readonly image: File;
}

export interface IChangeTrackDataFilds {
  readonly id: string;
  name: string;
  author: string;
  text: string;
}

export interface ISearchPublicTrackFilds {
  text: string;
}
