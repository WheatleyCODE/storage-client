import {
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ChangePasswordPage,
  ActivatePage,
} from 'pages';
import { PathRoutes } from 'types';

export const noAuthRoutes = [
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
];
