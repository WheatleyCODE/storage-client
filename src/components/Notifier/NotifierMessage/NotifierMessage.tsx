import { useTypedDispatch } from 'hooks';
import React, { FC, useCallback } from 'react';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaFireAlt, FaTimes } from 'react-icons/fa';
import { notifierSlice } from 'store';
import './NotifierMessage.scss';

export interface INotifierMessageProps {
  color: 'green' | 'yellow' | 'red' | 'default';
  message: string;
  id: number;
}

export const NotifierMessage: FC<INotifierMessageProps> = ({ color, message, id }) => {
  const dispath = useTypedDispatch();

  const removeMessage = useCallback(() => {
    dispath(notifierSlice.actions.notifierRemoveMessage(id));
  }, [dispath, id]);

  return (
    <div className={`notifier-message ${color}`}>
      <div className="notifier-message__icon">
        {color === 'green' && <FaCheck />}
        {color === 'yellow' && <FaExclamationTriangle />}
        {color === 'red' && <FaFireAlt />}
        {color === 'default' && <FaInfoCircle />}
      </div>
      <div className="notifier-message__text">{message}</div>
      <div aria-hidden onClick={removeMessage} className="notifier-message__close">
        <FaTimes />
      </div>
    </div>
  );
};
