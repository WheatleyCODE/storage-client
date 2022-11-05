import {
  MdFolder,
  MdInsertDriveFile,
  MdLibraryMusic,
  MdAudiotrack,
  MdOutlineLink,
  MdPublic,
  MdLockOutline,
} from 'react-icons/md';
import { AccessTypes, ItemTypes } from 'types';

export const storageWorkplaceIcons = {
  [ItemTypes.FOLDER]: MdFolder,
  [ItemTypes.FILE]: MdInsertDriveFile,
  [ItemTypes.ALBUM]: MdLibraryMusic,
  [ItemTypes.TRACK]: MdAudiotrack,
};

export const storageWorkplaceAccessIcons = {
  [AccessTypes.LINK]: MdOutlineLink,
  [AccessTypes.PUBLIC]: MdPublic,
  [AccessTypes.PRIVATE]: MdLockOutline,
};
