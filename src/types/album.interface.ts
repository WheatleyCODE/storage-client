import { IItem } from './item.interface';
import { ITrack } from './track.interface';

export interface IAlbum extends IItem {
  author: string;
  image: string;
  imageSize: number;
  tracks: ITrack[];
}

export interface ICreateAlbumFilds {
  readonly name: string;
  readonly author: string;
  readonly parent?: string;
  readonly image: File;
  readonly tracks?: string[];
}

export interface IChangeAlbumImageFilds {
  id: string;
}

export interface IChangeAlbumDataFilds {
  id: string;
  name: string;
  author: string;
}

export interface ISearchPublicAlbumFilds {
  text: string;
}
