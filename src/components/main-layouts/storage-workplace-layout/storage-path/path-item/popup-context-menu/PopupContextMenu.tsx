import React, { FC, memo } from 'react';
import { IContextMenuItem } from 'hooks';
import { ContextMenuItem } from 'components';
import './PopupContextMenu.scss';

export interface IPopupContextMenuProps {
  onClose: () => void;
  contextMenuItems: IContextMenuItem[];
}

export const PopupContextMenu: FC<IPopupContextMenuProps> = memo((props) => {
  const { onClose, contextMenuItems } = props;

  return (
    <div className="popup-context-menu">
      {contextMenuItems.map(({ title, Icon, handler, options, brAfter, brBefore }) => (
        <div key={title}>
          {brAfter && <div className="popup-context-menu__br" />}
          <ContextMenuItem
            side="right"
            options={options}
            handler={handler}
            onClose={onClose}
            title={title}
            Icon={Icon}
          />
          {brBefore && <div className="popup-context-menu__br" />}
        </div>
      ))}
    </div>
  );
});
