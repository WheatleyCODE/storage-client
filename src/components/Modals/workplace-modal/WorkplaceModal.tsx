import React, { FC } from 'react';
import { Portal, Backdrop, Button } from 'components';
import { MdArrowBack, MdArrowLeft, MdArrowRight } from 'react-icons/md';
import './WorkplaceModal.scss';

export interface IWorkplaceModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const WorkplaceModal: FC<IWorkplaceModalProps> = ({ onClose, children }) => {
  return (
    <Portal>
      <Backdrop isDark onClose={onClose}>
        <div className="workplace-modal">
          <div className="workplace-modal__header">
            <div className="workplace-modal__name">
              <Button type="icon" Icon={MdArrowBack} />
              <div>Name</div>
            </div>
            <div className="workplace-modal__app">app</div>
            <div className="workplace-modal__buttons">buttons</div>
          </div>

          <div className="workplace-modal__right">
            <div className="workplace-modal__icon">
              <MdArrowRight />
            </div>
          </div>
          <div className="workplace-modal__left">
            <div className="workplace-modal__icon">
              <MdArrowLeft />
            </div>
          </div>
          <div className="workplace-modal__item">{children}</div>
        </div>
      </Backdrop>
    </Portal>
  );
};
