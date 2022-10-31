import React, { FC, memo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContextMenu } from 'hooks';
import { getContextMenuHeight } from 'utils';
import { IContextMenuItem } from 'hooks/useContextMenu';
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

  const [items, setItems] = useState<IContextMenuItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setItems(contextMenuItems);
    }, 50);
  }, [contextMenuItems]);

  return (
    <motion.div
      initial={{ height: 0, translateY: -10, opacity: 0.1 }}
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
      exit={{ height: 0, translateY: -10, opacity: 0.1 }}
      transition={{ duration: 0.15 }}
      style={{ left, right, top, bottom }}
      className="context-menu"
    >
      <AnimatePresence>
        {items.map(({ Icon, title, brAfter, brBefore }) => {
          return (
            <div key={title}>
              {brAfter && <div className="context-menu__br" />}
              <ContextMenuItem onClose={onClose} title={title} Icon={Icon} />
              {brBefore && <div className="context-menu__br" />}
            </div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
});
