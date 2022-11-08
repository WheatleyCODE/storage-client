import {
  StorageFoldersPage,
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
  },
  {
    path: PathRoutes.STORAGE_SHARED,
    Page: StorageSharedPage,
  },
  {
    path: PathRoutes.STORAGE_RECENT,
    Page: StorageRecentPage,
  },
  {
    path: PathRoutes.STORAGE_STARRED,
    Page: StorageStarredPage,
  },
  {
    path: PathRoutes.STORAGE_TRASH,
    Page: StorageTrashPage,
  },
  {
    path: PathRoutes.STORAGE_FOLDERS,
    Page: StorageFoldersPage,
  },
];
