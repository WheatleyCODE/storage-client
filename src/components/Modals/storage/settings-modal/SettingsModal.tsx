import React, { FC, useCallback, useState } from 'react';
import { StorageSize, Checkbox, Confirm, Portal, Backdrop, Modal } from 'components';
import { useActions, useTypedSelector } from 'hooks';
import './SettingsModal.scss';

export interface ISettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: FC<ISettingsModalProps> = ({ onClose }) => {
  const { diskSpace, usedSpace, isRecommend, isTools } = useTypedSelector((state) => state.storage);
  const [isShowTools, setIsShowTools] = useState(isTools);
  const [isShowRecommend, setIsShowRecommend] = useState(isRecommend);
  const { changeSettings } = useActions();

  const toggleIsTools = useCallback(() => setIsShowTools((p) => !p), []);
  const toggleIsRecommend = useCallback(() => setIsShowRecommend((p) => !p), []);

  const changeSettingsHandler = useCallback(() => {
    changeSettings({ isRecommend: isShowRecommend, isTools: isShowTools });
    onClose();
  }, [isShowRecommend, isShowTools, onClose]);

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
                    value={isShowTools}
                    label="Показывать дополнительные модули"
                    onClick={toggleIsTools}
                  />
                </div>
                <div className="settings-modal__checkbox">
                  <Checkbox
                    value={isShowRecommend}
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
