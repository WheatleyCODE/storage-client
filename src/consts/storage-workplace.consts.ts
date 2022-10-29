import { MdFolder, MdInsertDriveFile, MdLibraryMusic, MdAudiotrack } from 'react-icons/md';
import { ItemTypes } from 'types';

export const storageWorkplaceIcons = {
  [ItemTypes.FOLDER]: MdFolder,
  [ItemTypes.FILE]: MdInsertDriveFile,
  [ItemTypes.ALBUM]: MdLibraryMusic,
  [ItemTypes.TRACK]: MdAudiotrack,
};
