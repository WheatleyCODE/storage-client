/* eslint-disable max-classes-per-file */
import { ItemTypesArr } from 'consts';
import { ItemTypes, SortTypes, IServerItemData } from 'types';
import { PropertyFactory } from './item-properties/item-properties.factory';
// import { getSize } from 'utils';

export class SortMethods {
  static [SortTypes.NAME] = (x: IServerItemData, y: IServerItemData): number => {
    return x.name.localeCompare(y.name);
  };

  static [SortTypes.NAME_REVERCE] = (x: IServerItemData, y: IServerItemData): number => {
    return x.name.localeCompare(y.name) * -1;
  };

  static [SortTypes.ACCESS] = (x: IServerItemData, y: IServerItemData): number => {
    return x.accessType.localeCompare(y.accessType);
  };

  static [SortTypes.ACCESS_REVERCE] = (x: IServerItemData, y: IServerItemData): number => {
    return x.accessType.localeCompare(y.accessType) * -1;
  };

  static [SortTypes.DATE] = (x: IServerItemData, y: IServerItemData): number => {
    return x.changeDate - y.changeDate;
  };

  static [SortTypes.DATE_REVERCE] = (x: IServerItemData, y: IServerItemData): number => {
    return (x.changeDate - y.changeDate) * -1;
  };

  static [SortTypes.SIZE] = (x: IServerItemData, y: IServerItemData): number => {
    const xData = PropertyFactory.create(x);
    const yData = PropertyFactory.create(y);
    return xData.getSize() - yData.getSize();
  };

  static [SortTypes.SIZE_REVERCE] = (x: IServerItemData, y: IServerItemData): number => {
    const xData = PropertyFactory.create(x);
    const yData = PropertyFactory.create(y);
    return xData.getSize() - yData.getSize() * -1;
  };
}

export class StorageSorter {
  private [ItemTypes.FOLDER]: IServerItemData[] = [];
  private [ItemTypes.TRACK]: IServerItemData[] = [];
  private [ItemTypes.FILE]: IServerItemData[] = [];
  private [ItemTypes.ALBUM]: IServerItemData[] = [];
  private [ItemTypes.IMAGE]: IServerItemData[] = [];
  private [ItemTypes.VIDEO]: IServerItemData[] = [];

  sort(items: IServerItemData[], sortType: SortTypes): IServerItemData[] {
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
