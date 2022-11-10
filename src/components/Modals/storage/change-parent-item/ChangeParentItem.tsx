import React, { FC, useCallback, useState } from 'react';
import { Confirm } from 'components';
import { useActions } from 'hooks';
import { IFolder, WorkplaceItem } from 'types';
import { ChangeParentFolder } from './change-parent-folder/ChangeParentFolder';
import './ChangeParentItem.scss';

export interface IChangeParentItem {
  currentItems: WorkplaceItem[];
  folders: IFolder[];
  onClose: () => void;
}

export const ChangeParentItem: FC<IChangeParentItem> = ({ currentItems, onClose, folders }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { changeParent } = useActions();

  const setActiveHandler = useCallback((i: number) => setActiveIndex(i), []);

  const changeParentHandler = useCallback(() => {
    if (activeIndex === null) return;

    const folder = folders[activeIndex];

    if (!folder) return;

    const { id: parent } = folder;

    changeParent({
      items: currentItems.map(({ id, type }) => ({ id, type })),
      parent,

      // ! fix
      prevParent: parent,
      isCanRestore: true,
    });

    onClose();
  }, [activeIndex, currentItems, folders]);

  return (
    <Confirm upproveText="Переместить" onClose={onClose} onUpprove={changeParentHandler}>
      <div className="change-parent-item">
        <h1 className="change-parent-item__title">Переместить</h1>

        <h2 className="change-parent-item__folders-title">Выберите куда переместить:</h2>
        <div className="change-parent-item__folders">
          {folders.map((folder, i) => (
            <ChangeParentFolder
              setActiveHandler={setActiveHandler}
              isActive={i === activeIndex}
              key={folder.id}
              folder={folder}
              index={i}
            />
          ))}
        </div>
      </div>
    </Confirm>
  );
};
