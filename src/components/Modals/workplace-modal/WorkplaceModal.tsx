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
  MdCreate,
} from 'react-icons/md';
import { useActions } from 'hooks';
import { IClientItemData } from 'types';
import './WorkplaceModal.scss';

export interface IWorkplaceModalProps {
  onClose: () => void;
  children: React.ReactNode;
  currentItemData: IClientItemData;
  isChange?: boolean;
}

export const WorkplaceModal: FC<IWorkplaceModalProps> = (props) => {
  const { onClose, children, currentItemData, isChange = false } = props;
  const { downloadFile } = useActions();

  const stopPropagation = useCallback((e: MouseEvent) => e.stopPropagation(), []);

  const MemoEye = memo(MdOutlineRemoveRedEye);
  const MemoCreate = memo(MdCreate);

  const download = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { id, type } = currentItemData;
    downloadFile({ id, type });
  };

  return (
    <Portal>
      <Backdrop isDark onClose={onClose}>
        <div className="workplace-modal">
          <div aria-hidden onClick={stopPropagation} className="workplace-modal__header">
            <div className="workplace-modal__name">
              <Button
                onClick={onClose}
                outline="fill"
                color="none-light"
                type="icon"
                Icon={MdArrowBack}
              />
              <div className="workplace-modal__item-name">{currentItemData.name}</div>
            </div>
            <div className="workplace-modal__app">
              {isChange ? (
                <div className="workplace-modal__correct">
                  Редактирование <MemoCreate />
                </div>
              ) : (
                <div className="workplace-modal__only-view">
                  Только просмотр <MemoEye />
                </div>
              )}
            </div>
            <div className="workplace-modal__buttons">
              <Button outline="fill" color="none-light" type="icon" Icon={MdOutlineAddComment} />
              <Button
                onClick={download}
                outline="fill"
                color="none-light"
                type="icon"
                Icon={MdFileDownload}
              />
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
