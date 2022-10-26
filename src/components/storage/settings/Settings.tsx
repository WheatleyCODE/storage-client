import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import { FcSettings } from 'react-icons/fc';
import { Popup, Button, PopupMenu } from 'components';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING, storageSettings } from 'consts';
import './Settings.scss';

export const Settings: FC = memo(() => {
  const [showPopup, setShowPopup] = useState(false);
  const { pathname } = useLocation();

  const closePopup = useCallback(() => setShowPopup(false), []);

  const openPopup = useCallback(() => {
    if (!showPopup) {
      setTimeout(() => {
        setShowPopup(true);
      }, 0);
    }
  }, [showPopup]);

  const items = storageSettings.map((item) => ({ ...item, path: `${pathname}${item.hash}` }));

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
