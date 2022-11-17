import { AccessTypes } from './storage-workplace.intarface';

export type MessageColor = 'green' | 'yellow' | 'red' | 'default';
export interface INotifierMessage {
  id: number;
  color: MessageColor;
  text: string;
  restoreActionName?: RestoreActionNames;
  restoreParams?: any;
}

export interface INotifierCreateMessage {
  color: MessageColor;
  text: string;
  restoreActionName?: RestoreActionNames;
  restoreParams?: any;
}

export enum RestoreActionNames {
  CHANGE_IS_THASH = 'CHANGE_IS_THASH',
  CHANGE_NAME = 'CHANGE_NAME',
  CHANGE_PARENT = 'CHANGE_PARENT',
  CHANGE_ACCESS_TYPE = 'CHANGE_ACCESS_TYPE',
}

export interface INotifierState {
  currentMessages: INotifierMessage[];
}

export interface ICanRestore {
  isCanRestore: boolean;
}

export interface IChangeNameRestore extends ICanRestore {
  prevName: string;
}

export interface IChangeIsTrashRestore extends ICanRestore {
  prevIsTrash: boolean;
}

export interface IChangeParentRestore extends ICanRestore {
  prevParent: string | null;
}

export interface IChangeAccessTypeRestore extends ICanRestore {
  prevAccessType: AccessTypes;
}
