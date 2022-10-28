import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router';
import { User, Search, Apps, Settings, Portal, Backdrop, Modal, SearchMobile } from 'components';
import { settingsAndHotkeysStoragePages } from 'consts';
import { PathRoutes } from 'types';
import './StorageSearch.scss';

export const StorageSearch: FC = memo(() => {
  const [showSettings, setShowSettings] = useState(false);
  const [showHotkeys, setShowHotkeys] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (settingsAndHotkeysStoragePages.includes(pathname)) {
      if (hash === PathRoutes.STORAGE_SETTINGS) setShowSettings(true);
      if (hash === PathRoutes.STORAGE_HOTKEYS) setShowHotkeys(true);
    }
  }, [hash, pathname]);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    navigate(pathname);
  }, [navigate, pathname]);

  const closeHotkeys = useCallback(() => {
    setShowHotkeys(false);
    navigate(pathname);
  }, [navigate, pathname]);

  return (
    <div className="storage-search">
      <div className="storage-search__user-icon">
        <User />
      </div>
      <div className="storage-search__apps-icon">
        <Apps />
      </div>
      <div className="storage-search__settings-icon">
        <Settings />
      </div>
      <div className="storage-search__search-icon">
        <SearchMobile />
      </div>
      <div className="storage-search__search-input">
        <Search />
      </div>

      <AnimatePresence>
        {showSettings && (
          <Portal>
            <Backdrop onClose={closeSettings}>
              <Modal onClose={closeSettings}>
                <h1>Настройки будут позже</h1>
              </Modal>
            </Backdrop>
          </Portal>
        )}

        {showHotkeys && (
          <Portal>
            <Backdrop onClose={closeHotkeys}>
              <Modal onClose={closeHotkeys}>
                <h1>Хоткеи будут позже</h1>
              </Modal>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
});
