import { IItemProperties, ItemTypes, WorkplaceItem } from 'types';
import { AlbumProperties } from './album.properties';
import { FileProperties } from './file.properties';
import { FolderProperties } from './folder.properties';
import { ImageProperties } from './image.properties';
import { TrackProperties } from './track.properties';
import { VideoProperties } from './video.properties';

export class PropertyFactory {
  static list = {
    [ItemTypes.FOLDER]: FolderProperties,
    [ItemTypes.FILE]: FileProperties,
    [ItemTypes.TRACK]: TrackProperties,
    [ItemTypes.ALBUM]: AlbumProperties,
    [ItemTypes.IMAGE]: ImageProperties,
    [ItemTypes.VIDEO]: VideoProperties,
  };

  static create(item: WorkplaceItem): IItemProperties {
    return new this.list[item.type](item as any);
  }
}
