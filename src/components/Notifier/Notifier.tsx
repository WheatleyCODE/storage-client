import React, { FC, useEffect, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from 'components';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { notifierActions } from 'store';
import { Emitter } from 'helpers';
import { EventNames } from 'types';
import { NotifierMessage } from './notifier-message/NotifierMessage';
import './Notifier.scss';

export const Notifier: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const { currentMessages } = useTypedSelector((state) => state.notifier);

  useEffect(() => {
    const emitter = Emitter.getInstance();

    const unsub = emitter.subscribe(EventNames.ADD_MESSAGE, (data) => {
      if (data.type === EventNames.ADD_MESSAGE) {
        dispatch(notifierActions.notifierAddMessage(data.data));
      }
    });

    return unsub;
  }, []);

  return (
    <Portal>
      <div aria-hidden onClick={(e) => e.stopPropagation()} className="notifier">
        <AnimatePresence>
          {currentMessages.map((message) => (
            <NotifierMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </Portal>
  );
});
