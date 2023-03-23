import { changeAlbumData } from 'store/album/album.actions';
import { changeColor } from 'store/folder/folder.actions';
import {
  changeIsTrash,
  changeName,
  changeParent,
  createAccessLink,
  changeAccessType,
} from 'store/items/items.actions';
import { changeTrackData } from 'store/track/track.actions';
import { changeVideoData } from 'store/video/video.actions';

export const restoreActionTypes: { [x: string]: boolean } = {
  [changeColor.pending.type]: true,
  [changeColor.fulfilled.type]: true,
  [changeColor.rejected.type]: true,

  [changeAlbumData.pending.type]: true,
  [changeAlbumData.fulfilled.type]: true,
  [changeAlbumData.rejected.type]: true,

  [changeIsTrash.pending.type]: true,
  [changeIsTrash.fulfilled.type]: true,
  [changeIsTrash.rejected.type]: true,

  [changeName.pending.type]: true,
  [changeName.fulfilled.type]: true,
  [changeName.rejected.type]: true,

  [changeParent.pending.type]: true,
  [changeParent.fulfilled.type]: true,
  [changeParent.rejected.type]: true,

  [createAccessLink.pending.type]: true,
  [createAccessLink.fulfilled.type]: true,
  [createAccessLink.rejected.type]: true,

  [changeAccessType.pending.type]: true,
  [changeAccessType.fulfilled.type]: true,
  [changeAccessType.rejected.type]: true,

  [changeTrackData.pending.type]: true,
  [changeTrackData.fulfilled.type]: true,
  [changeTrackData.rejected.type]: true,

  [changeVideoData.pending.type]: true,
  [changeVideoData.fulfilled.type]: true,
  [changeVideoData.rejected.type]: true,
};
