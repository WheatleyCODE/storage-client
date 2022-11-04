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
}

export interface IItemFilds {
  id: string;
  type: ItemTypes;
}

export interface IDeleteItemsFilds {
  items: IItemFilds[];
}

export interface IChangeIsTrashFilds {
  items: IItemFilds[];
  isTrash: boolean;
}
