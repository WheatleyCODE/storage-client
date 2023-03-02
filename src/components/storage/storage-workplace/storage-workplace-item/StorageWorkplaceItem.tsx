import React, { FC, memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActions, useTypedDispatch } from 'hooks';
import {
  // calcAndFormatSize,
  getColorClassName,
  getWorkplaceIcon,
  getWorkplaceUrl,
  transformAccess,
  transformDate,
} from 'utils';
import { ItemTypes, ModalsStateKeys, WorkplaceItem } from 'types';
import { stateKeysToHashModals } from 'consts';
import { modalsActions } from 'store';
import './StorageWorkplaceItem.scss';

export interface IStorageWorkplaceItemProps {
  item: WorkplaceItem;
  isActive: boolean;
  index: number;
  changeActive: (i: number) => void;
  addActive: (i: number) => void;
  addActiveShift: (i: number) => void;
}

export const StorageWorkplaceItem: FC<IStorageWorkplaceItemProps> = (props) => {
  const { item, isActive, changeActive, addActive, addActiveShift, index } = props;
  const [isDragEnter, setIsDragEnter] = useState(false);
  const navigate = useNavigate();
  const { uploadFiles } = useActions();
  const dispatch = useTypedDispatch();
  const { pathname } = useParams();

  const MemoIcon = memo(getWorkplaceIcon(item));

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      addActive(index);
      return;
    }

    if (e.shiftKey) {
      addActiveShift(index);
      return;
    }

    changeActive(index);
  };

  const onContextMenu = () => {
    if (!isActive) {
      changeActive(index);
    }
  };

  const getOpenModal = (key: ModalsStateKeys, isHash = true) => {
    const hash = stateKeysToHashModals[key];

    if (isHash) {
      return () => {
        navigate(pathname + hash);
        dispatch(modalsActions.changeIsModal({ key, boolean: true }));
      };
    }

    return () => {
      dispatch(modalsActions.changeIsModal({ key, boolean: true }));
    };
  };

  // ! Fix
  const openWorkplaceItem = () => {
    if (item.type === ItemTypes.IMAGE) {
      getOpenModal('isImage', false)();
      return;
    }

    if (item.type === ItemTypes.VIDEO) {
      getOpenModal('isVideo', false)();
      return;
    }

    if (item.type === ItemTypes.TRACK) {
      getOpenModal('isTrack', false)();
      return;
    }

    if (item.type === ItemTypes.ALBUM) {
      getOpenModal('isAlbum', false)();
      return;
    }

    navigate(getWorkplaceUrl(item));
  };

  const onDragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(true);
  }, []);

  const onDragLeaveHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragEnter(false);
  }, []);

  const onDropHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...(e.dataTransfer.files as any)];
    setIsDragEnter(false);
    uploadFiles({ files, parent: item.id });
  }, []);

  const isFolder = item.type === ItemTypes.FOLDER;

  return (
    <div
      aria-hidden
      onClick={onClick}
      onDoubleClick={openWorkplaceItem}
      onContextMenu={onContextMenu}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={isFolder ? onDropHandler : undefined}
      className={`storage-workplace-item ${isActive ? 'active' : ''} ${
        isDragEnter && isFolder ? 'drag' : ''
      } ${isDragEnter && !isFolder ? 'grey' : ''}`}
    >
      <div className="storage-workplace-item__name">
        <MemoIcon className={`storage-workplace-item__icon ${getColorClassName(item)}`} />
        {item.name}
      </div>
      <div className="storage-workplace-item__access">{transformAccess(item.accessType)}</div>
      <div className="storage-workplace-item__open-date">{transformDate(item.openDate)}</div>
      <div className="storage-workplace-item__size">calcAndFormatSizeFix</div>
    </div>
  );
};
