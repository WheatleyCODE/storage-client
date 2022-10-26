import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BsThreeDots } from 'react-icons/bs';
import { Popup, PopupMenu } from 'components';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import { PathRoutes } from 'types';
import './PathMore.scss';

export interface PathMoreProps {
  folders: { title: string }[];
}

export const PathMore: FC<PathMoreProps> = memo(({ folders }) => {
  const [show, setShow] = useState(false);

  const openPopup = useCallback(() => {
    if (!show) {
      setTimeout(() => {
        setShow(true);
      }, 0);
    }
  }, [show]);
  const closePopup = useCallback(() => setShow(false), []);

  const MemoIcon = memo(BsThreeDots);
  const items = folders.map((folder) => ({ ...folder, path: `${PathRoutes.STORAGE_MY_DRIVE}` }));

  return (
    <div aria-hidden onClick={openPopup} className={`path-more ${show ? 'active' : ''}`}>
      <MemoIcon className="path-more__icon" />
      <AnimatePresence>
        {show && (
          <Popup
            onClose={closePopup}
            height={folders.length * POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING}
          >
            <PopupMenu items={items} onClose={closePopup} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
});
