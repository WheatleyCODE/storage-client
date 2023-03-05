import React, { FC, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { modalsActions } from 'store';
import { useItems, useTypedDispatch, useTypedSelector } from 'hooks';
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
  FileModal,
  CreateVideoModal,
  AlbumModal,
  RenameModal,
  ChangeParentModal,
  GetLinkModal,
  ChangeAccessModal,
  ChangeAlbumDataModal,
  ChangeTrackDataModal,
  ChangeVideoDataModal,
} from 'components';
import { hashToStateKeys } from 'consts';
import { PropertyFactory } from 'helpers';
import { ItemTypes, ModalsStateKeys } from 'types';

export const ModalsController: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modals = useTypedSelector((state) => state.modals);
  const { currentItems } = useTypedSelector((state) => state.storage);

  const folders = useItems({ onlyTypes: [ItemTypes.FOLDER], isParent: true });

  const foldersData = folders.map((folder) => PropertyFactory.create(folder));
  const currentItemsData = currentItems.map((item) => PropertyFactory.create(item));
  const currentItemData = currentItemsData[0];

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

  return (
    <AnimatePresence>
      {modals.isCreateFolder && <CreateFolderModal onClose={getClose('isCreateFolder')} />}
      {modals.isCreateAlbum && <CreateAlbumModal onClose={getClose('isCreateAlbum')} />}
      {modals.isCreateTrack && <CreateTrackModal onClose={getClose('isCreateTrack')} />}
      {modals.isCreateVideo && <CreateVideoModal onClose={getClose('isCreateVideo')} />}
      {modals.isDelete && (
        <DeleteModal onClose={getClose('isDelete')} currentItemsData={currentItemsData} />
      )}
      {modals.isSettings && <SettingsModal onClose={getClose('isSettings')} />}
      {modals.isHotkeys && <HotkeysModal onClose={getClose('isHotkeys')} />}
      {modals.isRename && (
        <RenameModal currentItemData={currentItemData} onClose={getClose('isRename')} />
      )}
      {modals.isChangeParent && (
        <ChangeParentModal
          folders={foldersData}
          currentItemsData={currentItemsData}
          onClose={getClose('isChangeParent')}
        />
      )}
      {modals.isGetLink && (
        <GetLinkModal currentItemData={currentItemData} onClose={getClose('isGetLink')} />
      )}
      {modals.isBuySpace && <BuyMoreSpaceModal onClose={getClose('isBuySpace')} />}
      {modals.isChangeAccess && (
        <ChangeAccessModal currentItemData={currentItemData} onClose={getClose('isChangeAccess')} />
      )}
      {modals.isImage && (
        <ImageModal currentItemData={currentItemData} onClose={getClose('isImage')} />
      )}
      {modals.isVideo && (
        <VideoModal currentItemData={currentItemData} onClose={getClose('isVideo')} />
      )}
      {modals.isTrack && (
        <TrackModal currentItemData={currentItemData} onClose={getClose('isTrack')} />
      )}
      {modals.isFile && (
        <FileModal currentItemData={currentItemData} onClose={getClose('isFile')} />
      )}
      {modals.isAlbum && (
        <AlbumModal currentItemData={currentItemData} onClose={getClose('isAlbum')} />
      )}
      {modals.isChangeDataAlbum && (
        <ChangeAlbumDataModal
          currentItemData={currentItemData}
          onClose={getClose('isChangeDataAlbum')}
        />
      )}
      {modals.isChangeDataTrack && (
        <ChangeTrackDataModal
          currentItemData={currentItemData}
          onClose={getClose('isChangeDataTrack')}
        />
      )}
      {modals.isChangeDataVideo && (
        <ChangeVideoDataModal
          currentItemData={currentItemData}
          onClose={getClose('isChangeDataVideo')}
        />
      )}
    </AnimatePresence>
  );
};
