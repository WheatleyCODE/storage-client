import React, { FC, useEffect, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from 'components';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { notifierActions } from 'store';
import { emitter, EventNames } from 'helpers';
import { NotifierMessage } from './notifier-message/NotifierMessage';
import './Notifier.scss';

export const Notifier: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const { currentMessages } = useTypedSelector((state) => state.notifier);

  useEffect(() => {
    const unsub = emitter.subscribe(EventNames.ADD_MESSAGE, (message) => {
      dispatch(notifierActions.notifierAddMessage(message));
    });

    return unsub;
  }, []);

  return (
    <Portal>
      <div className="notifier">
        <AnimatePresence>
          {currentMessages.map((message) => (
            <NotifierMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </Portal>
  );
});
