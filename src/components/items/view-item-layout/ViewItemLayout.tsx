import React, { FC } from 'react';
import { Button } from 'components';
import { MdOutlineEdit } from 'react-icons/md';
import './ViewItemLayout.scss';

export interface IViewItemLayoutProps {
  children: React.ReactNode;
  onClick?: () => void;
  isChange?: boolean;
}

export const ViewItemLayout: FC<IViewItemLayoutProps> = ({ children, onClick, isChange }) => {
  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div aria-hidden onClick={(e) => e.stopPropagation()} className="view-item-layout">
      {isChange && (
        <Button
          className="view-item-layout__change-modal"
          onClick={onClickHandler}
          outline="fill"
          color="none-light"
          type="icon"
          Icon={MdOutlineEdit}
        />
      )}
      {children}
    </div>
  );
};
