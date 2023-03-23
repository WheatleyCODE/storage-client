import { IServerItemData } from './storage.interface';

export type MessageColor = 'green' | 'yellow' | 'red' | 'default';

export interface ITimeId {
  clientId: number;
}

export interface IRestoreItem extends ITimeId {
  items: IServerItemData[];
}
export interface IRestoreAlertMessage {
  color: MessageColor;
  text: string;
  isRestore: boolean;
}

export interface IAddMessageAndPrevItems {
  message: IRestoreAlertMessage;
  items: IServerItemData[];
}

export type IRestoreMessage = IRestoreAlertMessage & ITimeId;

export interface IRestoreState {
  currentMessages: IRestoreMessage[];
  restoreMessages: IRestoreMessage[];
  restoreItems: IRestoreItem[];
}

export type IRestoreLSState = Omit<IRestoreState, 'currentMessages'>;
