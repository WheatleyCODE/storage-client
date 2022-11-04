import React, { FC, memo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { HiChevronRight } from 'react-icons/hi';
import { IContextOptions } from 'hooks';
import { Popup } from 'components';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import { ContextMenuPopup } from './context-menu-popup/ContextMenuPopup';
import './ContextMenuItem.scss';

export interface IContextMenuItemProps {
  Icon: IconType;
  title: string;
  onClose: () => void;
  handler: () => void;
  options?: IContextOptions[];
  side: 'left' | 'right';
}

export const ContextMenuItem: FC<IContextMenuItemProps> = (props) => {
  const { Icon, title, onClose, handler, options, side } = props;
  const [show, setShow] = useState(false);
  const MemoIcon = memo(Icon);
  const MemoChevron = memo(HiChevronRight);

  const onClick = () => {
    onClose();
    handler();
  };

  return (
    <div
      onMouseEnter={options && (() => setShow(true))}
      onMouseLeave={options && (() => setShow(false))}
      aria-hidden
      onClick={onClick}
      className={`context-menu-item ${side}`}
    >
      <MemoIcon className="context-menu-item__icon" />
      <div className="context-menu-item__title">{title}</div>

      {options && (
        <div className="context-menu-item__options-icon">
          <MemoChevron />
        </div>
      )}

      <AnimatePresence>
        {options && show && (
          <Popup onClose={() => {}} height={POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING}>
            <ContextMenuPopup options={options} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
};
