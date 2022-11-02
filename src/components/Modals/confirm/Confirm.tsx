import React, { FC } from 'react';
import { Button } from 'components';
import './Confirm.scss';

export interface IConfirmProps {
  children: React.ReactNode;
  onClose: () => void;
  onUpprove: () => void;
  upproveText?: string;
}
export const Confirm: FC<IConfirmProps> = (props) => {
  const { children, onClose, onUpprove, upproveText = 'Создать' } = props;

  return (
    <div className="confirm">
      {children}

      <div className="confirm__buttons">
        <Button onClick={onClose} outline="outline" color="orange" text="Отмена" />
        <Button onClick={onUpprove} outline="outline" color="blue" text={upproveText} />
      </div>
    </div>
  );
};
