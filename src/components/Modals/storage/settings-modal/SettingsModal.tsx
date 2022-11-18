import React, { FC, useCallback, useState } from 'react';
import { StorageSize, Checkbox, Confirm } from 'components';
import { useTypedSelector } from 'hooks';
import './SettingsModal.scss';

export interface ISettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: FC<ISettingsModalProps> = ({ onClose }) => {
  const [isTools, setIsTools] = useState(true);
  const { diskSpace, usedSpace } = useTypedSelector((state) => state.storage);

  const toggleIsTools = useCallback(() => setIsTools((p) => !p), []);

  return (
    <Confirm upproveText="Сохранить" onClose={onClose} onUpprove={() => {}}>
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
              value={isTools}
              label="Показывать рекомендуемые файлы"
              onClick={toggleIsTools}
            />
          </div>
        </div>
      </div>
    </Confirm>
  );
};
