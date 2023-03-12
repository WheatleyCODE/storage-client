import { IItem } from './item.interface';

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
  video: File;
}

export interface IChangeVideoImageFilds {
  id: string;
  image: File;
}

export interface IChangeVideoDataFilds {
  id: string;
  name: string;
  description: string;
}

export interface ISearchPublicVideoFilds {
  text: string;
}
