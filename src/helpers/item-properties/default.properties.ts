import { WorkplaceItem } from 'types';

export class DefaultProperties {
  constructor(
    item: WorkplaceItem,
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
  ) {}
}
