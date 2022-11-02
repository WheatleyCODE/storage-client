import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import { FcSettings } from 'react-icons/fc';
import { Popup, Button, PopupMenu } from 'components';
import {
  hashToStateKeys,
  POPUP_MENU_ITEM_HEIGHT,
  POPUP_MENU_PADDING,
  storageSettings,
} from 'consts';
import './Settings.scss';
import { useTypedDispatch } from 'hooks';
import { modalsActions } from 'store';
import { ModalsStateKeys } from 'types';

export const Settings: FC = memo(() => {
  const [showPopup, setShowPopup] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();

  const closePopup = useCallback(() => setShowPopup(false), []);
  const openPopup = useCallback(() => {
    if (!showPopup) {
      setTimeout(() => setShowPopup(true), 0);
    }
  }, [showPopup]);

  const getOpen = (key: ModalsStateKeys) => {
    return () => {
      dispatch(modalsActions.changeIsModal({ key, boolean: true }));
    };
  };

  const items = storageSettings.map((item) => {
    return {
      ...item,
      path: `${pathname}${item.hash}`,
      onClick: getOpen(hashToStateKeys[item.hash]),
    };
  });

  return (
    <div className="settings">
      <Button
        className={showPopup ? 'open' : ''}
        onClick={openPopup}
        type="icon"
        Icon={FcSettings}
      />

      <AnimatePresence>
        {showPopup && (
          <Popup
            onClose={closePopup}
            height={items.length * POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING}
          >
            <PopupMenu items={items} onClose={closePopup} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
});
