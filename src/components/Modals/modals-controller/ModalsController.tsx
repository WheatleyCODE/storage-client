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
  DeleteItem,
  ImageModal,
  SettingsModal,
  HotkeysModal,
  BuyMoreSpace,
  VideoModal,
  TrackModal,
  CreateVideo,
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
              <SettingsModal onClose={getClose('isSettings')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isHotkeys && (
        <Portal>
          <Backdrop onClose={getClose('isHotkeys')}>
            <Modal onClose={getClose('isHotkeys')}>
              <HotkeysModal onClose={getClose('isSettings')} />
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

      {modals.isImage && (
        <Portal>
          <Backdrop className="dark" onClose={getClose('isImage')}>
            <ImageModal currentItems={currentItems} onClose={getClose('isImage')} />
          </Backdrop>
        </Portal>
      )}

      {modals.isBuySpace && (
        <Portal>
          <Backdrop onClose={getClose('isBuySpace')}>
            <Modal onClose={getClose('isBuySpace')}>
              <BuyMoreSpace onClose={getClose('isBuySpace')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isVideo && (
        <Portal>
          <Backdrop className="dark" onClose={getClose('isVideo')}>
            <Modal onClose={getClose('isVideo')}>
              <VideoModal currentItems={currentItems} onClose={getClose('isVideo')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isTrack && (
        <Portal>
          <Backdrop className="dark" onClose={getClose('isTrack')}>
            <Modal onClose={getClose('isTrack')}>
              <TrackModal currentItems={currentItems} onClose={getClose('isTrack')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isCreateVideo && (
        <Portal>
          <Backdrop onClose={getClose('isCreateVideo')}>
            <Modal className="create-video__modal" onClose={getClose('isCreateVideo')}>
              <CreateVideo onClose={getClose('isCreateVideo')} />
            </Modal>
          </Backdrop>
        </Portal>
      )}
    </AnimatePresence>
  );
};
