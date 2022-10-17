import React, { FC, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from 'components';
import { notifierSlice } from 'store';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { emitter, EventNames } from 'helpers';
import { NotifierMessage } from './NotifierMessage/NotifierMessage';
import './Notifier.scss';

export const Notifier: FC = () => {
  const dispatch = useTypedDispatch();
  const { currentMessages } = useTypedSelector((state) => state.notifier);

  useEffect(() => {
    emitter.subscribe(EventNames.DISPATCH_MESSAGE, (message) => {
      dispatch(notifierSlice.actions.notifierAddMessage(message));
    });
  }, [dispatch]);

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
};
