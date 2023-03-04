import { IItem } from './item.interface';

export interface IVideo extends IItem {
  description: string;
  image: string;
  imageSize: number;
  file: string;
  fileSize: number;
}

export interface ICreateVideoFilds {
  readonly name: string;
  readonly description: string;
  readonly parent?: string;
  readonly video: File;
  readonly image?: File;
}

export interface IChangeVideoFileFilds {
  id: string;
}

export interface IChangeVideoImageFilds {
  id: string;
}

export interface IChangeVideoDataFilds {
  id: string;
  name: string;
  description: string;
}

export interface ISearchPublicVideoFilds {
  text: string;
}
