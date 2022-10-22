import { StoragePage } from 'pages';
import { PathRoutes } from 'types';

export const authRoutes = [
  {
    path: PathRoutes.STORAGE_MY_DRIVE,
    Page: StoragePage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_SHARED,
    Page: StoragePage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_RECENT,
    Page: StoragePage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_STARRED,
    Page: StoragePage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_TRASH,
    Page: StoragePage,
    childs: [],
  },
];
