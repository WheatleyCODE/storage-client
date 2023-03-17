import React, { FC, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { HiChevronRight } from 'react-icons/hi';
import { useDelayHover } from 'hooks';
import { Popup } from 'components';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import { IContextOptions } from 'types';
import { ContextMenuPopup } from './context-menu-popup/ContextMenuPopup';
import './ContextMenuItem.scss';

export interface IContextMenuItemProps {
  Icon: IconType;
  title: string;
  onClose: () => void;
  handler?: () => void;
  options?: IContextOptions[];
  side: 'left' | 'right';
}

export const ContextMenuItem: FC<IContextMenuItemProps> = (props) => {
  const { Icon, title, onClose, handler, options, side } = props;
  const { onMouseEnter, onMouseLeave, onMouseMove, isShow } = useDelayHover();
  const MemoIcon = memo(Icon);
  const MemoChevron = memo(HiChevronRight);

  const onClick = () => {
    if (handler) {
      onClose();
      handler();
    }
  };

  return (
    <div
      onMouseEnter={options && onMouseEnter}
      onMouseLeave={options && onMouseLeave}
      onMouseMove={options && onMouseMove}
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
        {options && isShow && (
          <Popup onClose={onClose} height={POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING}>
            <ContextMenuPopup onClose={onClose} options={options} />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
};
