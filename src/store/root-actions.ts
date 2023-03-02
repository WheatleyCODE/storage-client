import * as authActions from './auth/auth.actions';
import * as itemsActions from './items/items.actions';
import * as storageActions from './storage/storage.actions';
import * as albumActions from './album/album.actions';
import * as folderActions from './folder/folder.actions';
import * as downloadActions from './download/download.actions';
import * as trackActions from './track/track.actions';
import * as videoActions from './video/video.actions';
import * as uploaderActions from './uploader/uploader.actions';

export const rootActions = {
  ...authActions,
  ...storageActions,
  ...albumActions,
  ...folderActions,
  ...itemsActions,
  ...downloadActions,
  ...trackActions,
  ...videoActions,
  ...uploaderActions,
};
