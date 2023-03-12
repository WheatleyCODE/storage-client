import {
  FolderColors,
  ModalsStateKeys,
  openModalKeys,
  IServerItemData,
  ITrack,
  openChangeModalKeys,
} from 'types';

export class DefaultProperties {
  openModalStateKey: ModalsStateKeys | null;
  openChangeModalStateKey: ModalsStateKeys | null;
  description: string | null = null;
  text: string | null = null;
  author: string | null = null;
  color: FolderColors | null = null;
  tracks: ITrack[] | null = null;
  fileExt: string | null = null;

  constructor(
    private item: IServerItemData,
    readonly id = item.id,
    readonly user = item.user,
    readonly type = item.type,
    readonly name = item.name,
    readonly parent = item.parent,
    readonly isTrash = item.isTrash,
    readonly likeCount = item.likeCount,
    readonly likedUsers = item.likedUsers,
    readonly listenCount = item.listenCount,
    readonly starredCount = item.starredCount,
    readonly accessType = item.accessType,
    readonly accessLink = item.accessLink,
    readonly createDate = item.createDate,
    readonly changeDate = item.changeDate,
    readonly openDate = item.openDate,
    readonly comments = item.comments
  ) {
    this.openModalStateKey = openModalKeys[item.type] || null;
    this.openChangeModalStateKey = openChangeModalKeys[item.type] || null;
  }

  toServerItemData(): IServerItemData {
    return this.item;
  }
}
