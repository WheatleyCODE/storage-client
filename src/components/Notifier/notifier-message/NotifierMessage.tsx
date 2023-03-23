import React, { FC, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useActions, useTypedDispatch, useTypedSelector } from 'hooks';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaFireAlt, FaTimes } from 'react-icons/fa';
import { restoreActions } from 'store';
import { IRestoreMessage } from 'types';
import './NotifierMessage.scss';

export interface INotifierMessageProps {
  message: IRestoreMessage;
}

export const NotifierMessage: FC<INotifierMessageProps> = ({ message }) => {
  const { text, color, isRestore, clientId } = message;
  const { restoreItemsReq } = useActions();
  const dispath = useTypedDispatch();
  const { restoreItems } = useTypedSelector((state) => state.restore);

  const removeMessage = useCallback(() => {
    if (isRestore) {
      dispath(restoreActions.deleteCurrentMessage(clientId));
      return;
    }

    dispath(restoreActions.deleteMessageAndPrevItem(clientId));
  }, [clientId]);

  const restoreItemsHandler = useCallback(() => {
    const restoreItem = restoreItems.find((item) => item.clientId === clientId);
    if (!restoreItem) return;

    restoreItemsReq(restoreItem);

    dispath(restoreActions.deleteMessageAndPrevItem(clientId));
  }, [restoreItems, clientId]);

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
      transition={{ duration: 0.1 }}
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
      {isRestore && (
        <div onClick={restoreItemsHandler} aria-hidden className="notifier-message__restore">
          ОТМЕНИТЬ
        </div>
      )}
      <div aria-hidden onClick={removeMessage} className="notifier-message__close">
        <MemoFaTimes />
      </div>
    </motion.div>
  );
};
