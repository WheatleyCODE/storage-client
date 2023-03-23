import React, { FC, useCallback, useState, memo } from 'react';
import { useLocation, useParams } from 'react-router';
import { FcSafe } from 'react-icons/fc';
import { Confirm, Portal, Modal, Backdrop } from 'components';
import { useActions } from 'hooks';
import { checkPathnameOnPathRoute } from 'utils';
import { IClientItemData, PathRoutes } from 'types';
import { ChangeParentFolder } from './change-parent-folder/ChangeParentFolder';
import './ChangeParentModal.scss';

export interface IChangeParentModal {
  currentItemsData: IClientItemData[];
  folders: IClientItemData[];
  onClose: () => void;
}

export const ChangeParentModal: FC<IChangeParentModal> = (props) => {
  const { currentItemsData, onClose, folders } = props;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { changeParent } = useActions();
  const params = useParams();
  const { pathname } = useLocation();

  const setActiveHandler = useCallback((i: number) => setActiveIndex(i), []);
  const clearActiveHandler = useCallback(() => setActiveIndex(null), []);

  const changeParentHandler = useCallback(() => {
    const filds: { parent: string | null } = { parent: null };

    if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_FOLDERS)) {
      filds.parent = params.id || null;
    }

    if (activeIndex === null) {
      changeParent({
        items: currentItemsData.map(({ id, type }) => ({ id, type })),
        parent: null,
      });

      onClose();
      return;
    }

    const folder = folders[activeIndex];
    if (!folder) return;
    const { id: parent } = folder;

    changeParent({
      items: currentItemsData.map(({ id, type }) => ({ id, type })),
      parent,
    });

    onClose();
  }, [activeIndex, currentItemsData, folders]);

  const MemoIcon = memo(FcSafe);

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm upproveText="Переместить" onClose={onClose} onUpprove={changeParentHandler}>
            <div className="change-parent-modal">
              <h1 className="change-parent-modal__title">Переместить</h1>

              <h2 className="change-parent-modal__folders-title">Выберите куда переместить:</h2>
              <div className="change-parent-modal__folders">
                <div
                  aria-hidden
                  onClick={clearActiveHandler}
                  className={`change-parent-modal__drive ${activeIndex === null ? 'active' : ''}`}
                >
                  <MemoIcon className="change-parent-modal__icon" />
                  Мой диск
                </div>

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
        </Modal>
      </Backdrop>
    </Portal>
  );
};
