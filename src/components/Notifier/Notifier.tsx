import React, { FC, useEffect, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { restoreActions } from 'store';
import { Portal } from 'components';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { getLSData, setLSData } from 'utils';
import { IRestoreLSState, LocalStorageKeys } from 'types';
import { NotifierMessage } from './notifier-message/NotifierMessage';
import './Notifier.scss';

export const Notifier: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const { currentMessages, restoreMessages, restoreItems } = useTypedSelector(
    (state) => state.restore
  );

  useEffect(() => {
    const restoreState = getLSData<IRestoreLSState>(LocalStorageKeys.RESTORE_STATE);

    if (restoreState) {
      dispatch(restoreActions.setState({ ...restoreState, currentMessages: [] }));
    }
  }, []);

  useEffect(() => {
    const restoreState: IRestoreLSState = {
      restoreMessages,
      restoreItems,
    };

    setLSData(LocalStorageKeys.RESTORE_STATE, restoreState);
  }, [restoreItems, restoreMessages]);

  return (
    <Portal>
      <div aria-hidden onClick={(e) => e.stopPropagation()} className="notifier">
        <AnimatePresence>
          {currentMessages.map((message) => (
            <NotifierMessage key={message.clientId} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </Portal>
  );
});
