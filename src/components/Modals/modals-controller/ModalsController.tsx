import React, { FC, useEffect } from 'react';
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
} from 'components';
import { useLocation, useNavigate } from 'react-router';
import { hashToStateKeys } from 'consts';
import { ModalsStateKeys } from 'types';

export const ModalsController: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modals = useTypedSelector((state) => state.modals);

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
              <CreateAlbum />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isCreateTrack && (
        <Portal>
          <Backdrop onClose={getClose('isCreateTrack')}>
            <Modal onClose={getClose('isCreateTrack')}>
              <CreateTrack />
            </Modal>
          </Backdrop>
        </Portal>
      )}

      {modals.isUploadFiles && (
        <Portal>
          <Backdrop onClose={getClose('isUploadFiles')}>
            <Modal onClose={getClose('isUploadFiles')}>
              <UploadFiles />
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
    </AnimatePresence>
  );
};
