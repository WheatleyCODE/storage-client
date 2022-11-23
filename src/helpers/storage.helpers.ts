/* eslint-disable max-classes-per-file */
import { ItemTypesArr } from 'consts';
import { ItemTypes, SortTypes, WorkplaceItem } from 'types';
import { getSize } from 'utils';

export class SortMethods {
  static [SortTypes.NAME] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return x.name.localeCompare(y.name);
  };

  static [SortTypes.NAME_REVERCE] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return x.name.localeCompare(y.name) * -1;
  };

  static [SortTypes.ACCESS] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return x.accessType.localeCompare(y.accessType);
  };

  static [SortTypes.ACCESS_REVERCE] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return x.accessType.localeCompare(y.accessType) * -1;
  };

  static [SortTypes.DATE] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return x.openDate - y.openDate;
  };

  static [SortTypes.DATE_REVERCE] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return (x.openDate - y.openDate) * -1;
  };

  static [SortTypes.SIZE] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return getSize(x) - getSize(y);
  };

  static [SortTypes.SIZE_REVERCE] = (x: WorkplaceItem, y: WorkplaceItem): number => {
    return (getSize(x) - getSize(y)) * -1;
  };
}

export class StorageSorter {
  private [ItemTypes.FOLDER]: WorkplaceItem[] = [];

  private [ItemTypes.TRACK]: WorkplaceItem[] = [];

  private [ItemTypes.FILE]: WorkplaceItem[] = [];

  private [ItemTypes.ALBUM]: WorkplaceItem[] = [];

  private [ItemTypes.IMAGE]: WorkplaceItem[] = [];

  private [ItemTypes.VIDEO]: WorkplaceItem[] = [];

  sort(items: WorkplaceItem[], sortType: SortTypes): WorkplaceItem[] {
    const sortMethod = SortMethods[sortType];

    ItemTypesArr.forEach((type) => {
      this[type] = items.filter((item) => item.type === type).sort(sortMethod);
    }, []);

    return [
      ...this.FOLDER,
      ...this.TRACK,
      ...this.FILE,
      ...this.ALBUM,
      ...this.IMAGE,
      ...this.VIDEO,
    ];
  }
}
