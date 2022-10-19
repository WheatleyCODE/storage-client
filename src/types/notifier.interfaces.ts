export type MessageColor = 'green' | 'yellow' | 'red' | 'default';
export interface INotifierMessage {
  id: number;
  color: MessageColor;
  message: string;
}

export interface INotifierState {
  currentMessages: INotifierMessage[];
}
