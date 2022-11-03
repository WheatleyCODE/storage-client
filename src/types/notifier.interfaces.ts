import { IChangeIsTrashFilds } from 'types';

export type MessageColor = 'green' | 'yellow' | 'red' | 'default';
export interface INotifierMessage {
  id: number;
  color: MessageColor;
  text: string;
  restoreActionName?: RestoreActionNames;
  restoreParams?: IChangeIsTrashFilds;
}

export interface INotifierCreateMessage {
  color: MessageColor;
  text: string;
  restoreActionName?: RestoreActionNames;
  restoreParams?: IChangeIsTrashFilds;
}

export enum RestoreActionNames {
  CHANGE_IS_THASH = 'CHANGE_IS_THASH',
}

export interface INotifierState {
  currentMessages: INotifierMessage[];
}
