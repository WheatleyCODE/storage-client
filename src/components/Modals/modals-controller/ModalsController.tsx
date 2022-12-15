import React, { FC, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import {
  CreateFolderModal,
  CreateAlbumModal,
  CreateTrackModal,
  DeleteModal,
  ImageModal,
  SettingsModal,
  HotkeysModal,
  BuyMoreSpaceModal,
  VideoModal,
  TrackModal,
  CreateVideoModal,
  AlbumModal,
  RenameModal,
  ChangeParentModal,
  GetLinkModal,
  ChangeAccessModal,
} from 'components';
import { hashToStateKeys } from 'consts';
import { IFolder, ItemTypes, ModalsStateKeys } from 'types';

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
      {modals.isCreateFolder && <CreateFolderModal onClose={getClose('isCreateFolder')} />}
      {modals.isCreateAlbum && <CreateAlbumModal onClose={getClose('isCreateAlbum')} />}
      {modals.isCreateTrack && <CreateTrackModal onClose={getClose('isCreateTrack')} />}
      {modals.isDelete && (
        <DeleteModal onClose={getClose('isDelete')} currentItems={currentItems} />
      )}
      {modals.isSettings && <SettingsModal onClose={getClose('isSettings')} />}
      {modals.isHotkeys && <HotkeysModal onClose={getClose('isHotkeys')} />}
      {modals.isRename && (
        <RenameModal currentItems={currentItems} onClose={getClose('isRename')} />
      )}
      {modals.isChangeParent && (
        <ChangeParentModal
          folders={folders}
          currentItems={currentItems}
          onClose={getClose('isChangeParent')}
        />
      )}
      {modals.isGetLink && (
        <GetLinkModal currentItems={currentItems} onClose={getClose('isGetLink')} />
      )}
      {modals.isBuySpace && <BuyMoreSpaceModal onClose={getClose('isBuySpace')} />}
      {modals.isChangeAccess && (
        <ChangeAccessModal currentItems={currentItems} onClose={getClose('isChangeAccess')} />
      )}
      {modals.isImage && <ImageModal currentItems={currentItems} onClose={getClose('isImage')} />}
      {modals.isVideo && <VideoModal currentItems={currentItems} onClose={getClose('isVideo')} />}
      {modals.isTrack && <TrackModal currentItems={currentItems} onClose={getClose('isTrack')} />}
      {modals.isAlbum && <AlbumModal currentItems={currentItems} onClose={getClose('isAlbum')} />}
      {modals.isCreateVideo && <CreateVideoModal onClose={getClose('isCreateVideo')} />}
    </AnimatePresence>
  );
};
