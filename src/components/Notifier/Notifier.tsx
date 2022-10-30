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

  // todo check
  useEffect(() => {
    emitter.subscribe(EventNames.ADD_MESSAGE, (message) => {
      dispatch(notifierActions.notifierAddMessage(message));
    });
  }, []);

  return (
    <Portal>
      <div className="notifier">
        <AnimatePresence>
          {currentMessages.map(({ color, id, message }) => (
            <NotifierMessage id={id} key={id} color={color} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </Portal>
  );
});
