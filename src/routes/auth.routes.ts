import {
  StorageMyDrivePage,
  StorageRecentPage,
  StorageSharedPage,
  StorageStarredPage,
  StorageTrashPage,
} from 'pages';
import { PathRoutes } from 'types';

export const authRoutes = [
  {
    path: PathRoutes.STORAGE_MY_DRIVE,
    Page: StorageMyDrivePage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_SHARED,
    Page: StorageSharedPage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_RECENT,
    Page: StorageRecentPage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_STARRED,
    Page: StorageStarredPage,
    childs: [],
  },
  {
    path: PathRoutes.STORAGE_TRASH,
    Page: StorageTrashPage,
    childs: [],
  },
];
