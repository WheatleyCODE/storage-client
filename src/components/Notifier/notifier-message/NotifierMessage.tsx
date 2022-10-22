import React, { FC, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useTypedDispatch } from 'hooks';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaFireAlt, FaTimes } from 'react-icons/fa';
import { notifierSlice } from 'store';
import { MessageColor } from 'types';
import './NotifierMessage.scss';

export interface INotifierMessageProps {
  color: MessageColor;
  message: string;
  id: number;
}

export const NotifierMessage: FC<INotifierMessageProps> = ({ color, message, id }) => {
  const dispath = useTypedDispatch();

  const removeMessage = useCallback(() => {
    dispath(notifierSlice.actions.notifierRemoveMessage(id));
  }, [dispath, id]);

  useEffect(() => {
    setTimeout(() => {
      removeMessage();
    }, 10000);
  }, [removeMessage]);

  const MemoFaCheck = memo(FaCheck);
  const MemoFaExclamation = memo(FaExclamationTriangle);
  const MemoFaFireAlt = memo(FaFireAlt);
  const MemoFaInfoCircle = memo(FaInfoCircle);
  const MemoFaTimes = memo(FaTimes);

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -300 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.1,
        translateX: 25,
      }}
      className={`notifier-message ${color}`}
    >
      <div className="notifier-message__icon">
        {color === 'green' && <MemoFaCheck />}
        {color === 'yellow' && <MemoFaExclamation />}
        {color === 'red' && <MemoFaFireAlt />}
        {color === 'default' && <MemoFaInfoCircle />}
      </div>
      <div className="notifier-message__text">{message}</div>
      <div aria-hidden onClick={removeMessage} className="notifier-message__close">
        <MemoFaTimes />
      </div>
    </motion.div>
  );
};