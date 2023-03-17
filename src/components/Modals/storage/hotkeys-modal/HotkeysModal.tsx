import React, { FC } from 'react';
import { hotkeys } from 'consts';
import { Portal, Backdrop, Modal } from 'components';
import { HotkeysModalItem } from './hotkeys-modal-item/HotkeysModalItem';
import './HotkeysModal.scss';

export interface IHotkeysModalProps {
  onClose: () => void;
}

export const HotkeysModal: FC<IHotkeysModalProps> = ({ onClose }) => {
  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <div className="hotkeys-modal">
            <h1 className="hotkeys-modal__title">Горячие клавиши</h1>

            <div className="hotkeys-modal__hotkeys">
              {hotkeys.map(({ title, hotkeys: hotkeyArr }) => (
                <div key={title}>
                  <h4 className="hotkeys-modal__sub-title">{title}</h4>
                  {hotkeyArr.map((hotkey) => (
                    <HotkeysModalItem key={hotkey.title} hotkey={hotkey} />
                  ))}
                </div>
              ))}
            </div>
            <div className="hotkeys-modal__margin" />
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
