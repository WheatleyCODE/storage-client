import React, { FC, useCallback, useState } from 'react';
import { StorageSize, Checkbox, Confirm, Portal, Backdrop, Modal } from 'components';
import { useActions, useTypedSelector } from 'hooks';
import './SettingsModal.scss';

export interface ISettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: FC<ISettingsModalProps> = ({ onClose }) => {
  const { diskSpace, usedSpace, settings } = useTypedSelector((state) => state.storage);
  const [isTools, setIsTools] = useState(settings.isTools);
  const [isRecommend, setIsRecommend] = useState(settings.isRecommend);
  const { changeSettings } = useActions();

  const toggleIsTools = useCallback(() => setIsTools((p) => !p), []);
  const toggleIsRecommend = useCallback(() => setIsRecommend((p) => !p), []);

  const changeSettingsHandler = useCallback(() => {
    changeSettings({ isRecommend, isTools });
    onClose();
  }, [isRecommend, isTools, onClose]);

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm upproveText="Сохранить" onClose={onClose} onUpprove={changeSettingsHandler}>
            <div className="settings-modal">
              <h1 className="settings-modal__title">Настройки</h1>
              <StorageSize diskSpace={diskSpace} usedSpace={usedSpace} />
              <div className="settings-modal__checkboxes">
                <div className="settings-modal__checkbox">
                  <Checkbox
                    value={isTools}
                    label="Показывать дополнительные модули"
                    onClick={toggleIsTools}
                  />
                </div>
                <div className="settings-modal__checkbox">
                  <Checkbox
                    value={isRecommend}
                    label="Показывать рекомендуемые файлы"
                    onClick={toggleIsRecommend}
                  />
                </div>
              </div>
            </div>
          </Confirm>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
