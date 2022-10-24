import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaCog } from 'react-icons/fa';
import { Popup, Button } from 'components';
import { SettingsPopup } from './settings-popup/SettingsPopup';
import './Settings.scss';

export const Settings: FC = memo(() => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => setShowPopup(false), []);

  const openPopup = useCallback(() => {
    if (!showPopup) {
      setTimeout(() => {
        setShowPopup(true);
      }, 0);
    }
  }, [showPopup]);

  return (
    <div className="settings">
      <Button className={showPopup ? 'open' : ''} onClick={openPopup} type="icon" Icon={FaCog} />

      <AnimatePresence>
        {showPopup && (
          <Popup onClose={closePopup} height={120}>
            <SettingsPopup onClose={closePopup} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
});
