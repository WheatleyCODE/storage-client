import { IItem } from './item.interface';
import { ItemTypes } from './storage-workplace.intarface';

export interface ITrack extends IItem {
  author: string;
  text: string;
  image: string;
  imageSize: number;
  file: string;
  fileSize: number;
  fileExt: string;
}

export interface ICreateTrackFilds {
  name: string;
  author: string;
  text: string;
  parent?: string;
  album?: string;
  audio: File;
  image?: File;
}

export interface IChangeTrackFileFilds {
  id: string;
  type: ItemTypes;
  audio: File;
}

export interface IChangeTrackImageFilds {
  id: string;
  type: ItemTypes;
  image: File;
}

export interface IChangeTrackDataFilds {
  id: string;
  type: ItemTypes;
  name: string;
  author: string;
  text: string;
}

export interface ISearchPublicTrackFilds {
  text: string;
}
