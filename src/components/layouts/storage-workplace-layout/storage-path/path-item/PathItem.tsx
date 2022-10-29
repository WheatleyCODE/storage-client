import React, { FC, memo, useCallback, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import './PathItem.scss';

export interface PathItemProps {
  title: string;
  isLast: boolean;
}

export const PathItem: FC<PathItemProps> = memo(({ title, isLast }) => {
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => {
    if (isLast) setShow((p) => !p);
  }, [isLast]);

  const MemoIcon = memo(FaCaretDown);

  return (
    <div
      aria-hidden
      onClick={toggleShow}
      className={`path-item ${isLast ? 'last' : ''} ${show ? 'active' : ''}`}
    >
      <div className="path-item__title">{title}</div>
      <div className="path-item__icon">
        <MemoIcon />
      </div>
    </div>
  );
});
