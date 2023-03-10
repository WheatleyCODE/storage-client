import React, { FC } from 'react';
import { Button } from 'components';
import { MdOutlineEdit } from 'react-icons/md';
import './ViewItemLayout.scss';

export interface IViewItemLayoutProps {
  children: React.ReactNode;
  onClickButton?: () => void;
  onClickContainer?: () => void;
  isChange?: boolean;
}

export const ViewItemLayout: FC<IViewItemLayoutProps> = (props) => {
  const { children, onClickButton, onClickContainer, isChange } = props;
  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClickButton) onClickButton();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClickContainer) onClickContainer();
  };

  return (
    <div aria-hidden onClick={stopPropagation} className="view-item-layout">
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
