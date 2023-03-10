import React, { FC, memo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'components';
import './ActionWindow.scss';
import { useClickOutside } from 'hooks';

export interface IActionWindowProps {
  children: React.ReactNode;
  onClose: () => void;
  onSuccess: () => void;
  actionName: string;
  initialWidth: number | string;
  initialHeiht: number | string;
  animateWidth: number | string;
  animateHeiht: number | string;
  exitWidth: number | string;
  exitHeiht: number | string;
  className?: string;
}

export const ActionWindow: FC<IActionWindowProps> = memo((props) => {
  const {
    initialWidth,
    initialHeiht,
    animateWidth,
    animateHeiht,
    exitWidth,
    exitHeiht,
    onClose,
    onSuccess,
    actionName,
    children,
    className,
  } = props;

  const ref = useRef<null | HTMLDivElement>(null);
  useClickOutside(ref, onClose, ['click', 'contextmenu']);

  const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, width: initialWidth, height: initialHeiht }}
      animate={{ opacity: 1, width: animateWidth, height: animateHeiht }}
      exit={{ opacity: 0, width: exitWidth, height: exitHeiht }}
      transition={{ duration: 0.1 }}
      className={`action-window ${className || ''}`}
      onClick={stopPropagation}
    >
      <div className="action-window__name">{actionName}</div>

      {children}

      <div className="action-window__buttons">
        <Button onClick={onClose} outline="fill" color="red" text="Закрыть" />
        <Button onClick={onSuccess} outline="fill" color="blue" text="Подтверить" />
      </div>
    </motion.div>
  );
});
