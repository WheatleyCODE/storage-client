import React, { FC, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { modalsActions } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import {
  Portal,
  Backdrop,
  Modal,
  CreateFolder,
  CreateAlbum,
  CreateTrack,
  UploadFiles,
  DeleteItem,
} from 'components';
import { useLocation, useNavigate } from 'react-router';
import { hashToStateKeys } from 'consts';
import { IFolder, ItemTypes, ModalsStateKeys } from 'types';
import { RenameItem } from '../storage/rename-item/RenameItem';
import { ChangeParentItem } from '../storage/change-parent-item/ChangeParentItem';
import { GetLinkItem } from '../storage/get-link-item/GetLinkItem';
import { ChangeAccessItem } from '../storage/change-access-item/ChangeAccessItem';

export const ModalsController: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modals = useTypedSelector((state) => state.modals);
  const { currentItems, allItems } = useTypedSelector((state) => state.storage);

  const getClose = (key: ModalsStateKeys) => {
    return () => {
      dispatch(modalsActions.changeIsModal({ key, boolean: false }));
      navigate(location.pathname);
    };
  };

  useEffect(() => {
    if (location.hash) {
      const key = hashToStateKeys[location.hash];

      if (!key) return;

      dispatch(modalsActions.changeIsModal({ key, boolean: true }));
    }
  }, []);

  const folders = useMemo(
    () => allItems.filter((item) => item.type === ItemTypes.FOLDER),
    [allItems]
  ) as IFolder[];

  return (
    <AnimatePresence>
      {modals.isCreateFolder && (
        <Portal>
          <Backdrop onClose={getClose('isCreateFolder')}>
            <Modal onClose={getClose('isCreateFolder')}>
              <CreateFolder onClose={getClose('isCreateFolder')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isCreateAlbum && (
        <Portal>
          <Backdrop onClose={getClose('isCreateAlbum')}>
            <Modal onClose={getClose('isCreateAlbum')}>
              <CreateAlbum onClose={getClose('isCreateAlbum')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isCreateTrack && (
        <Portal>
          <Backdrop onClose={getClose('isCreateTrack')}>
            <Modal className="create-track__modal" onClose={getClose('isCreateTrack')}>
              <CreateTrack onClose={getClose('isCreateTrack')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isUploadFiles && (
        <Portal>
          <Backdrop onClose={getClose('isUploadFiles')}>
            <Modal onClose={getClose('isUploadFiles')}>
              <UploadFiles onClose={getClose('isUploadFiles')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isDelete && (
        <Portal>
          <Backdrop onClose={getClose('isDelete')}>
            <Modal onClose={getClose('isDelete')}>
              <DeleteItem onClose={getClose('isDelete')} currentItems={currentItems} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isSettings && (
        <Portal>
          <Backdrop onClose={getClose('isSettings')}>
            <Modal onClose={getClose('isSettings')}>
              <h1>Настройки будут позже</h1>
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isHotkeys && (
        <Portal>
          <Backdrop onClose={getClose('isHotkeys')}>
            <Modal onClose={getClose('isHotkeys')}>
              <h1>Хоткеи будут позже</h1>
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isRename && (
        <Portal>
          <Backdrop onClose={getClose('isRename')}>
            <Modal onClose={getClose('isRename')}>
              <RenameItem currentItems={currentItems} onClose={getClose('isRename')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isChangeParent && (
        <Portal>
          <Backdrop onClose={getClose('isChangeParent')}>
            <Modal onClose={getClose('isChangeParent')}>
              <ChangeParentItem
                folders={folders}
                currentItems={currentItems}
                onClose={getClose('isChangeParent')}
              />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isGetLink && (
        <Portal>
          <Backdrop onClose={getClose('isGetLink')}>
            <Modal onClose={getClose('isGetLink')}>
              <GetLinkItem currentItems={currentItems} onClose={getClose('isGetLink')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isChangeAccess && (
        <Portal>
          <Backdrop onClose={getClose('isChangeAccess')}>
            <Modal onClose={getClose('isChangeAccess')}>
              <ChangeAccessItem currentItems={currentItems} onClose={getClose('isChangeAccess')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}
    </AnimatePresence>
  );
};
