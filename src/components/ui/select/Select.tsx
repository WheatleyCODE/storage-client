import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IconType } from 'react-icons';
import { HiChevronDown } from 'react-icons/hi';
import { useClickOutside } from 'hooks';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import { SelectItem } from './select-item/SelectItem';
import './Select.scss';

export interface ISelectProps extends React.HTMLAttributes<HTMLInputElement> {
  items: { Icon?: IconType; text: string }[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Select: FC<ISelectProps> = memo((props) => {
  const { items, activeIndex, setActiveIndex, placeholder, ...anotherProps } = props;
  const [isActive, setIsActive] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const ref = useRef<null | HTMLInputElement>(null);

  const placeholderControls = useAnimation();
  const itemsControls = useAnimation();

  useEffect(() => {
    if (isActive) {
      itemsControls.start('open');
      placeholderControls.start('active');
      setIsClose(false);
      return;
    }

    if (!isActive && activeIndex !== null) {
      itemsControls.start('close');
      placeholderControls.start('active');

      setTimeout(() => setIsClose(true), 150);
      return;
    }

    itemsControls.start('close');
    placeholderControls.start('default');
    setTimeout(() => setIsClose(true), 150);
  }, [activeIndex, isActive, itemsControls, placeholderControls]);

  const openSelect = useCallback(() => setIsActive(true), []);
  const closeSelect = useCallback(() => setIsActive(false), []);

  const newItem = items.map((item, i) => ({
    ...item,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setActiveIndex(i);
      closeSelect();
    },
  }));

  useClickOutside(ref, closeSelect);

  const isActiveIndex = activeIndex !== null;
  const isIcon = !!(isActiveIndex && items[activeIndex].Icon);
  const Icon = isActiveIndex && items[activeIndex].Icon;

  const MemoIcon = Icon && memo(Icon);

  return (
    <div ref={ref} aria-hidden onClick={openSelect} className={`select ${isIcon ? 'icon' : ''}`}>
      {isIcon && MemoIcon && (
        <div className="select__icon">
          <MemoIcon />
        </div>
      )}

      <div className="select__chevron">
        <HiChevronDown />
      </div>

      <input
        value={activeIndex !== null ? items[activeIndex].text : ''}
        readOnly
        className="select__textfild"
        {...anotherProps}
      />

      {placeholder && (
        <motion.div
          animate={placeholderControls}
          className="select__placeholder"
          initial="default"
          transition={{ duration: 0.15 }}
          variants={{
            active: isIcon
              ? { translateY: -23, translateX: 2, scale: 0.9 }
              : { translateY: -23, translateX: -10, scale: 0.9 },
            default: { translateY: 0, translateX: 0, scale: 1 },
          }}
        >
          {placeholder}
        </motion.div>
      )}

      <motion.div
        animate={itemsControls}
        className={`select__items ${isClose ? 'close' : ''}`}
        initial="default"
        transition={{ duration: 0.15 }}
        variants={{
          open: {
            opacity: 1,
            translateY: 0,
            height: items.length * POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING,
            overflow: 'hidden',
          },
          close: { opacity: 0, translateY: 0, height: 0 },
        }}
      >
        {newItem.map((item) => (
          <SelectItem key={item.text} item={item} />
        ))}
      </motion.div>
    </div>
  );
});
