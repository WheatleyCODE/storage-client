import React, { FC, memo, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContextMenu } from 'hooks';
import { getContextMenuHeight } from 'utils';
import { IContextMenuItem } from 'types';
import { ContextMenuItem } from './context-menu-item/ContextMenuItem';
import './ContextMenu.scss';

export interface IContextMenuProps {
  coords: {
    left?: string;
    top?: string;
    bottom?: string;
    right?: string;
  };
  onClose: () => void;
}

export const ContextMenu: FC<IContextMenuProps> = memo(({ coords, onClose }) => {
  const { left, right, top, bottom } = coords;
  const { contextMenuItems, itemsCount, brCount } = useContextMenu();
  const [className, setClassName] = useState('');

  const [items, setItems] = useState<IContextMenuItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setItems(contextMenuItems);
    }, 100);
  }, [contextMenuItems]);

  const setHide = useCallback(() => {
    setClassName('hide');
  }, []);

  const setOpen = useCallback(() => {
    setClassName('open');
  }, []);

  return (
    <motion.div
      onAnimationStart={setHide}
      onAnimationComplete={setOpen}
      initial={{
        height: 0,
        translateY: -10,
        translateX: 5,
        opacity: 0,
      }}
      animate={{
        height: getContextMenuHeight({
          itemsCount,
          defaultCount: 0,
          brCount,
        }),
        translateY: 0,
        opacity: 1,
        type: 'spring',
      }}
      exit={{ height: 0, translateY: -10, opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ left, right, top, bottom }}
      className={`context-menu ${className}`}
    >
      <AnimatePresence>
        {items.map(({ Icon, title, brAfter, brBefore, handler, options }) => {
          return (
            <div key={title}>
              {brAfter && <div className="context-menu__br" />}
              <ContextMenuItem
                side={!left ? 'left' : 'right'}
                options={options}
                handler={handler}
                onClose={onClose}
                title={title}
                Icon={Icon}
              />
              {brBefore && <div className="context-menu__br" />}
            </div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
});
