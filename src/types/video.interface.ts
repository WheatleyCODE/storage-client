import { IItem } from './item.interface';
import { ItemTypes } from './storage-workplace.intarface';

export interface IVideo extends IItem {
  description: string;
  image: string;
  imageSize: number;
  file: string;
  fileSize: number;
  fileExt: string;
}

export interface ICreateVideoFilds {
  name: string;
  description: string;
  parent?: string;
  video: File;
  image?: File;
}

export interface IChangeVideoFileFilds {
  id: string;
  type: ItemTypes;
  video: File;
}

export interface IChangeVideoImageFilds {
  id: string;
  type: ItemTypes;
  image: File;
}

export interface IChangeVideoDataFilds {
  id: string;
  type: ItemTypes;
  name: string;
  description: string;
}

export interface ISearchPublicVideoFilds {
  text: string;
}
