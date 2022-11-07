import {
  MdFolder,
  MdInsertDriveFile,
  MdLibraryMusic,
  MdAudiotrack,
  MdOutlineLink,
  MdPublic,
  MdLockOutline,
  MdFolderShared,
} from 'react-icons/md';
import { AccessTypes, ItemTypes } from 'types';

export const storageWorkplaceIcons = {
  [ItemTypes.FOLDER]: MdFolder,
  [ItemTypes.FILE]: MdInsertDriveFile,
  [ItemTypes.ALBUM]: MdLibraryMusic,
  [ItemTypes.TRACK]: MdAudiotrack,
  FOLDER_SHARED: MdFolderShared,
};

export const storageWorkplaceAccessIcons = {
  [AccessTypes.LINK]: MdOutlineLink,
  [AccessTypes.PUBLIC]: MdPublic,
  [AccessTypes.PRIVATE]: MdLockOutline,
};
