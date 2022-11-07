import React, { FC, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useTypedDispatch } from 'hooks';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaFireAlt, FaTimes } from 'react-icons/fa';
import { notifierSlice, restoreAsyncThunks } from 'store';
import { INotifierMessage } from 'types';
import './NotifierMessage.scss';

export interface INotifierMessageProps {
  message: INotifierMessage;
}

export const NotifierMessage: FC<INotifierMessageProps> = ({ message }) => {
  const { id, text, color, restoreActionName, restoreParams } = message;
  const dispath = useTypedDispatch();

  const removeMessage = useCallback(() => {
    dispath(notifierSlice.actions.notifierRemoveMessage(id));
  }, [dispath, id]);

  useEffect(() => {
    setTimeout(() => {
      removeMessage();
    }, 10000);
  }, [removeMessage]);

  const restore = useCallback(() => {
    if (restoreActionName && restoreParams) {
      dispath(restoreAsyncThunks[restoreActionName](restoreParams));
    }

    removeMessage();
  }, [removeMessage, restoreActionName, restoreParams]);

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
      className={`notifier-message ${color}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="notifier-message__icon">
        {color === 'green' && <MemoFaCheck />}
        {color === 'yellow' && <MemoFaExclamation />}
        {color === 'red' && <MemoFaFireAlt />}
        {color === 'default' && <MemoFaInfoCircle />}
      </div>
      <div className="notifier-message__text">{text}</div>
      {restoreActionName && (
        <div aria-hidden onClick={restore} className="notifier-message__restore">
          ОТМЕНИТЬ
        </div>
      )}
      <div aria-hidden onClick={removeMessage} className="notifier-message__close">
        <MemoFaTimes />
      </div>
    </motion.div>
  );
};
