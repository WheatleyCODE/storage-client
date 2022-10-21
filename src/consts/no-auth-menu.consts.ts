import { PathRoutes } from 'types';

export const noAuthDesctopMenu = [
  { title: 'Обзор', path: PathRoutes.HOME_REVIEW },
  { title: 'Возможности', path: PathRoutes.HOME_FEATURES },
  { title: 'Больше', path: PathRoutes.HOME_MORE },
];

export const noAuthMobileMenu = [
  { title: 'Войти', path: PathRoutes.LOGIN },
  { title: 'Регистрация', path: PathRoutes.REGISTER },
  { title: 'Сбросить пароль', path: PathRoutes.RESET_PASSWORD },
];
