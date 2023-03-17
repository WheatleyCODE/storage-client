import { IconType } from 'react-icons';
import { FolderColors } from './folder.interface';
import { ItemTypes } from './storage-workplace.intarface';

export interface IContextOptions {
  color: FolderColors;
  handler: () => void;
}
export interface IContextMenuItem {
  title: string;
  Icon: IconType;
  handler?: () => void;
  brAfter?: boolean;
  brBefore?: boolean;
  options?: IContextOptions[];
}

export interface IListCMI {
  [ItemTypes.FOLDER]: IContextMenuItem[];
  [ItemTypes.FILE]: IContextMenuItem[];
  [ItemTypes.ALBUM]: IContextMenuItem[];
  [ItemTypes.TRACK]: IContextMenuItem[];
  [ItemTypes.IMAGE]: IContextMenuItem[];
  [ItemTypes.VIDEO]: IContextMenuItem[];
}
