import { IAlbum } from './album.interface';
import { IFile } from './file.interface';
import { IFolder } from './folder.interface';
import { ITrack } from './track.interface';

export enum AdditionTypes {
  CALENDAR = 'CALENDAR',
  KEEP = 'KEEP',
  TODO = 'TODO',
}

export enum SortTypes {
  NAME = 'NAME',
  NAME_REVERCE = 'NAME_REVERCE',
  ACCESS = 'ACCESS',
  ACCESS_REVERCE = 'ACCESS_REVERCE',
  DATE = 'DATE',
  DATE_REVERCE = 'DATE_REVERCE',
  SIZE = 'SIZE',
  SIZE_REVERCE = 'SIZE_REVERCE',
}

export interface ICoords {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface IStorageData {
  id: string;
  name: string;
  user: string;
  diskSpace: number;
  usedSpace: number;
  folders: IFolder[];
  files: IFile[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IStorageSettings {
  isTools: boolean;
  isRecommend: boolean;
}

export interface IStorageState {
  id: string;
  currentItems: WorkplaceItem[];
  workplaceItems: WorkplaceItem[];
  parents: IFolder[];
  allItems: WorkplaceItem[];
  name: string;
  user: string;
  diskSpace: number;
  usedSpace: number;
  isLoading: boolean;
  isWorkplaceLoading: boolean;
  sortType: SortTypes;
  settings: IStorageSettings;
}

export interface IChildrensData {
  childrens: WorkplaceItem[];
  parents: IFolder[];
}

export type ISettingsData = IStorageSettings;

export type WorkplaceItem = IFolder | IFile | IAlbum | ITrack;
