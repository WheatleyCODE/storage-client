import React, { FC } from 'react';
import { MdOutlineCreditCardOff } from 'react-icons/md';
import { Backdrop, Button, Modal, Portal } from 'components';
import './BuyMoreSpaceModal.scss';

export interface IBuyMoreSpaceModalProps {
  onClose: () => void;
}

export const BuyMoreSpaceModal: FC<IBuyMoreSpaceModalProps> = ({ onClose }) => {
  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <div className="buy-more-space-modal">
            <div className="buy-more-space-modal__message">
              <div className="buy-more-space-modal__icon">
                <MdOutlineCreditCardOff />
              </div>
              <div className="buy-more-space-modal__text">
                К сожалению, наш швейцарский банк куда-то пропал и не может принимать платежи.
              </div>
            </div>
            <div className="buy-more-space-modal__button">
              <Button text="Освободить место в хранилище" />
            </div>
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
