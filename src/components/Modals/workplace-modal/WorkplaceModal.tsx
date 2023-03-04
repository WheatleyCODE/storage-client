import React, { FC, MouseEvent, useCallback, memo } from 'react';
import { Portal, Backdrop, Button } from 'components';
import {
  MdArrowBack,
  MdArrowLeft,
  MdArrowRight,
  MdDragIndicator,
  MdFileDownload,
  MdOutlineAddComment,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import './WorkplaceModal.scss';
import { IItemProperties } from 'types';

export interface IWorkplaceModalProps {
  onClose: () => void;
  children: React.ReactNode;
  currentItemData: IItemProperties;
}

export const WorkplaceModal: FC<IWorkplaceModalProps> = (props) => {
  const { onClose, children, currentItemData } = props;

  const stopPropagation = useCallback((e: MouseEvent) => e.stopPropagation(), []);

  const MemoEye = memo(MdOutlineRemoveRedEye);

  return (
    <Portal>
      <Backdrop isDark onClose={onClose}>
        <div className="workplace-modal">
          <div aria-hidden onClick={stopPropagation} className="workplace-modal__header">
            <div className="workplace-modal__name">
              <Button outline="fill" color="none-light" type="icon" Icon={MdArrowBack} />
              <div className="workplace-modal__item-name">{currentItemData.name}</div>
            </div>
            <div className="workplace-modal__app">
              <div className="workplace-modal__only-view">
                Только просмотр <MemoEye />
              </div>
            </div>
            <div className="workplace-modal__buttons">
              <Button outline="fill" color="none-light" type="icon" Icon={MdOutlineAddComment} />
              <Button outline="fill" color="none-light" type="icon" Icon={MdFileDownload} />
              <Button outline="fill" color="none-light" type="icon" Icon={MdDragIndicator} />
            </div>
          </div>

          <div className="workplace-modal__right">
            <div className="workplace-modal__icon">
              <Button
                onClick={stopPropagation}
                outline="fill"
                color="black"
                type="icon"
                Icon={MdArrowRight}
              />
            </div>
          </div>
          <div className="workplace-modal__left">
            <div className="workplace-modal__icon">
              <Button
                onClick={stopPropagation}
                outline="fill"
                color="black"
                type="icon"
                Icon={MdArrowLeft}
              />
            </div>
          </div>
          <div className="workplace-modal__item">{children}</div>
        </div>
      </Backdrop>
    </Portal>
  );
};
