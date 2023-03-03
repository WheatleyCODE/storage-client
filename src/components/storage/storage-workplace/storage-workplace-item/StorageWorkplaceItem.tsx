import React, { FC, memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActions, useOpenModal, useTypedDispatch } from 'hooks';
import {
  formatSize,
  getColorClassName,
  getWorkplaceIcon,
  getWorkplaceUrl,
  transformAccess,
  transformDate,
} from 'utils';
import { ItemTypes, ModalsStateKeys, WorkplaceItem } from 'types';
import { stateKeysToHashModals } from 'consts';
import { modalsActions } from 'store';
import { PropertyFactory } from 'helpers';
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
  const openModal = useOpenModal();

  const itemData = PropertyFactory.create(item);

  const MemoIcon = memo(getWorkplaceIcon(itemData));

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

  // ! Fixed
  // const getOpenModal = (key: ModalsStateKeys, isHash = true) => {
  //   const hash = stateKeysToHashModals[key];

  //   if (isHash) {
  //     return () => {
  //       navigate(pathname + hash);
  //       dispatch(modalsActions.changeIsModal({ key, boolean: true }));
  //     };
  //   }

  //   return () => {
  //     dispatch(modalsActions.changeIsModal({ key, boolean: true }));
  //   };
  // };

  // ! Fixed
  const openWorkplaceItem = () => {
    if (itemData.openModalStateKey) {
      openModal(itemData.openModalStateKey, false);
      return;
    }

    navigate(getWorkplaceUrl(itemData));
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
        <MemoIcon className={`storage-workplace-item__icon ${getColorClassName(itemData)}`} />
        {item.name}
      </div>
      <div className="storage-workplace-item__access">{transformAccess(itemData.accessType)}</div>
      <div className="storage-workplace-item__open-date">{transformDate(itemData.openDate)}</div>
      <div className="storage-workplace-item__size">{formatSize(itemData.getSize())}</div>
    </div>
  );
};
