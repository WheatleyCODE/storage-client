import { type } from 'os';
import { IAlbum } from './album.interface';
import { IFile } from './file.interface';
import { IFolder } from './folder.interface';
import { ITrack } from './track.interface';

export enum AdditionTypes {
  CALENDAR = 'CALENDAR',
  KEEP = 'KEEP',
  TODO = 'TODO',
}

export interface ICoords {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface IStorageState {
  id: string;
  currentItems: WorkplaceItem[];
  workplaceItems: WorkplaceItem[];
  allItems: WorkplaceItem[];
  lastItems: WorkplaceItem[];
  name: string;
  user: string;
  diskSpace: number;
  usedSpace: number;
  folders: IFolder[];
  files: IFile[];
  albums: IAlbum[];
  tracks: ITrack[];
  loading: boolean;
}

export type WorkplaceItem = IFolder | IFile | IAlbum | ITrack;
