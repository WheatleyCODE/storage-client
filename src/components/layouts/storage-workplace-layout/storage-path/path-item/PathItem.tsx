import React, { FC, memo, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { FaCaretDown } from 'react-icons/fa';
import { storageActions } from 'store';
import { useContextMenu, useTypedDispatch } from 'hooks';
import { Popup } from 'components';
import { getContextMenuHeight } from 'utils';
import { IFolder } from 'types';
import { PopupContextMenu } from './popup-context-menu/PopupContextMenu';
import './PathItem.scss';

export interface PathItemProps {
  title: string;
  isLast: boolean;
  path: string;
  iconColor: string;
  folder: IFolder;
}

export const PathItem: FC<PathItemProps> = memo((props) => {
  const { title, isLast, path, iconColor, folder } = props;
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const { contextMenuItems, brCount, itemsCount } = useContextMenu(true);

  const openPopup = useCallback(() => {
    if (isLast && !show) {
      setTimeout(() => {
        setShow(true);
        dispatch(storageActions.setCurrent([{ ...folder }]));
      }, 50);
      return;
    }

    setShow(false);
    navigate(path);
  }, [isLast, path, show]);

  const closePopup = () => {
    setShow(false);
  };

  const MemoIcon = memo(FaCaretDown);

  return (
    <div
      ref={ref}
      aria-hidden
      onClick={openPopup}
      onContextMenu={openPopup}
      className={`path-item ${isLast ? 'last' : ''} ${show ? 'active' : ''}`}
    >
      <div className="path-item__title">{title}</div>
      <div className={`path-item__icon ${iconColor}`}>
        <MemoIcon />
      </div>

      <AnimatePresence>
        {show && (
          <div aria-hidden onClick={(e) => e.stopPropagation()}>
            <Popup
              onClose={closePopup}
              height={getContextMenuHeight({
                itemsCount,
                defaultCount: 0,
                brCount,
              })}
            >
              <PopupContextMenu contextMenuItems={contextMenuItems} onClose={closePopup} />
            </Popup>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});
