export interface INotifierMessage {
  id: number;
  color: 'green' | 'yellow' | 'red' | 'default';
  message: string;
}
