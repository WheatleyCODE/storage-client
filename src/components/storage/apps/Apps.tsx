import React, { FC, memo, useCallback, useState } from 'react';
import { FcOrgUnit } from 'react-icons/fc';
import { AnimatePresence } from 'framer-motion';
import { Popup, Button } from 'components';
import { AppsPopup } from './apps-popup/AppsPopup';
import './Apps.scss';

export const Apps: FC = memo(() => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => setShowPopup(false), []);
  const openPopup = useCallback(() => {
    if (!showPopup) {
      setTimeout(() => setShowPopup(true), 0);
    }
  }, [showPopup]);

  return (
    <div className="apps">
      <Button
        color="none-dark"
        outline="fill"
        className={showPopup ? 'active' : ''}
        onClick={openPopup}
        type="icon"
        Icon={FcOrgUnit}
      />

      <AnimatePresence>
        {showPopup && (
          <Popup onClose={closePopup} height={120}>
            <AppsPopup onClose={closePopup} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
});
