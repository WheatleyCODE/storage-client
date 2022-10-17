import React, { FC } from 'react';
import { Portal } from 'components';
import { useTypedSelector } from 'hooks';
import { NotifierMessage } from './NotifierMessage/NotifierMessage';
import './Notifier.scss';

export const Notifier: FC = () => {
  const { currentMessages } = useTypedSelector((state) => state.notifier);

  return (
    <Portal>
      <div className="notifier">
        {currentMessages.map(({ color, id, message }) => (
          <NotifierMessage id={id} key={id} color={color} message={message} />
        ))}
      </div>
    </Portal>
  );
};
