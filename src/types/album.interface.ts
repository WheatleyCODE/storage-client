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
  readonly id: string;
  readonly image: File;
}

export interface IChangeAlbumDataFilds {
  readonly id: string;
  readonly name: string;
  readonly author: string;
}

export interface IChangeAlbumTracksFilds {
  readonly id: string;
  readonly tracks: string[];
}

export interface ISearchPublicAlbumFilds {
  readonly text: string;
}
