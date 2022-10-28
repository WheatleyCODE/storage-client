import React, { FC, memo } from 'react';
import { motion } from 'framer-motion';
import { BiTrash, BiDownload, BiInfoCircle } from 'react-icons/bi';
import {
  MdContentCopy,
  MdDriveFileRenameOutline,
  MdOutlineBookmarkAdd,
  MdOutlineDriveFileMove,
  MdOutlineLink,
  MdOutlineOpenWith,
  MdOutlinePalette,
} from 'react-icons/md';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { getContextMenuHeight } from 'utils';
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

  const ContextMenuItems = [
    {
      title: 'Изменить доступ',
      Icon: HiOutlineUserAdd,
      handler: () => {},
    },
    {
      title: 'Получить ссылку',
      Icon: MdOutlineLink,
      handler: () => {},
    },
    {
      title: 'Переместить',
      Icon: MdOutlineDriveFileMove,
      handler: () => {},
    },
    {
      title: 'Добавить в отмеченные',
      Icon: MdOutlineBookmarkAdd,
      handler: () => {},
    },
    {
      title: 'Переименовать',
      Icon: MdDriveFileRenameOutline,
      handler: () => {},
    },
  ];

  return (
    <motion.div
      initial={{ height: 0, translateY: -10, opacity: 0.3 }}
      animate={{
        height: getContextMenuHeight({
          itemsCount: ContextMenuItems.length,
          defaultCount: 6,
          brCount: 3,
        }),
        translateY: 0,
        opacity: 1,
      }}
      exit={{ height: 0, translateY: -10, opacity: 0.3 }}
      transition={{ duration: 0.12 }}
      style={{ left, right, top, bottom }}
      className="context-menu"
    >
      <ContextMenuItem onClose={onClose} Icon={MdOutlineOpenWith} title="Открыть" />
      <div className="context-menu__br" />

      {ContextMenuItems.map(({ Icon, title }) => (
        <ContextMenuItem key={title} onClose={onClose} Icon={Icon} title={title} />
      ))}
      <ContextMenuItem onClose={onClose} Icon={MdOutlinePalette} title="Изменить цвет" />

      <div className="context-menu__br" />
      <ContextMenuItem onClose={onClose} Icon={BiInfoCircle} title="Показать своства" />
      <ContextMenuItem onClose={onClose} Icon={MdContentCopy} title="Создать копию" />
      <ContextMenuItem onClose={onClose} Icon={BiDownload} title="Скачать" />
      <div className="context-menu__br" />
      <ContextMenuItem onClose={onClose} Icon={BiTrash} title="Удалить" />
    </motion.div>
  );
});
