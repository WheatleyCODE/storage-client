export enum AccessTypes {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  LINK = 'LINK',
}

export enum ItemTypes {
  FOLDER = 'FOLDER',
  TRACK = 'TRACK',
  FILE = 'FILE',
  ALBUM = 'ALBUM',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface IItemFilds {
  id: string;
  type: ItemTypes;
}

export interface IDeleteItemsFilds {
  items: IItemFilds[];
}

export interface IChangeIsTrashFilds extends IDeleteItemsFilds {
  isTrash: boolean;
}

export interface IChangeNameFilds extends IItemFilds {
  name: string;
}

export interface IChangeAccessTypeFilds extends IItemFilds {
  accessType: AccessTypes;
}

export interface IChangeParentFilds extends IDeleteItemsFilds {
  parent: string | null;
}

export type ICopyFilesFilds = IDeleteItemsFilds;
