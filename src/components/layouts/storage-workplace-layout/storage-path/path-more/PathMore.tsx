import React, { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { BsThreeDots } from 'react-icons/bs';
import { Popup, PopupMenu } from 'components';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import './PathMore.scss';

export interface PathMoreProps {
  items: {
    title: string;
    path: string;
    Icon?: IconType;
    iconColor?: string;
    onClick?: () => void;
  }[];
}

export const PathMore: FC<PathMoreProps> = memo(({ items }) => {
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

  return (
    <div aria-hidden onClick={openPopup} className={`path-more ${show ? 'active' : ''}`}>
      <MemoIcon className="path-more__icon" />
      <AnimatePresence>
        {show && (
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
