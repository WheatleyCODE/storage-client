export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  isActivated: boolean;
}
