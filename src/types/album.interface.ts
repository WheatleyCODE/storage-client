import { IItem } from './item.interface';
import { ItemTypes } from './storage-workplace.intarface';
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
  type: ItemTypes;
  image: File;
}

export interface IChangeAlbumDataFilds {
  id: string;
  type: ItemTypes;
  name: string;
  author: string;
}

export interface IChangeAlbumTracksFilds {
  id: string;
  type: ItemTypes;
  tracks: string[];
}

export interface ISearchPublicAlbumFilds {
  text: string;
}
