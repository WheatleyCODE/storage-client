import { lazy } from 'react';
import { HomePage, LoginPage, RegisterPage, ResetPasswordPage } from 'pages';
import { PathRoutes } from 'types';

const ActivatePage = lazy(() => import('pages/activate-page/ActivatePage'));
const ChangePasswordPage = lazy(() => import('pages/change-password-page/ChangePasswordPage'));

export const noAuthRoutes = [
  {
    path: PathRoutes.HOME,
    Page: HomePage,
  },
  {
    path: PathRoutes.LOGIN,
    Page: LoginPage,
  },
  {
    path: PathRoutes.REGISTER,
    Page: RegisterPage,
  },
  {
    path: PathRoutes.RESET_PASSWORD,
    Page: ResetPasswordPage,
  },
  {
    path: PathRoutes.CHANGE_PASSWORD,
    Page: ChangePasswordPage,
  },
  {
    path: PathRoutes.ACTIVATE,
    Page: ActivatePage,
  },
];
