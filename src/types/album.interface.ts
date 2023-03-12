import { IItem } from './item.interface';
import { ITrack } from './track.interface';

export interface IAlbum extends IItem {
  author: string;
  image: string;
  imageSize: number;
  tracks: ITrack[];
}

export interface ICreateAlbumFilds {
  name: string;
  author: string;
  parent?: string;
  image: File;
  tracks?: string[];
}

export interface IChangeAlbumImageFilds {
  id: string;
  image: File;
}

export interface IChangeAlbumDataFilds {
  id: string;
  name: string;
  author: string;
}

export interface IChangeAlbumTracksFilds {
  id: string;
  tracks: string[];
}

export interface ISearchPublicAlbumFilds {
  text: string;
}
