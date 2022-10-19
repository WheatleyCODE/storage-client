import {
  ActivatePage,
  ChangePasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  StoragePage,
} from 'pages';
import { PathRoutes } from 'types';

export const authRoutes = [
  {
    path: PathRoutes.HOME,
    Page: HomePage,
    childs: [],
  },
  {
    path: PathRoutes.LOGIN,
    Page: LoginPage,
    childs: [],
  },
  {
    path: PathRoutes.REGISTER,
    Page: RegisterPage,
    childs: [],
  },
  {
    path: PathRoutes.RESET_PASSWORD,
    Page: ResetPasswordPage,
    childs: [],
  },
  {
    path: PathRoutes.CHANGE_PASSWORD,
    Page: ChangePasswordPage,
    childs: [],
  },
  {
    path: PathRoutes.ACTIVATE,
    Page: ActivatePage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE,
    Page: StoragePage,
    childs: [],
  },
];
