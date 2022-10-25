import React, { FC, memo, useCallback, useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { AnimatePresence } from 'framer-motion';
import { Button, Portal, Modal, Backdrop } from 'components';
import './SearchMobile.scss';

export const SearchMobile: FC = memo(() => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => setShowModal(false), []);
  const openModal = useCallback(() => setShowModal(true), []);

  return (
    <div className="search-mobile">
      <Button onClick={openModal} type="icon" Icon={FcSearch} />

      <AnimatePresence>
        {showModal && (
          <Portal>
            <Backdrop onClose={closeModal}>
              <Modal onClose={closeModal}>
                <h1>Поиск</h1>
              </Modal>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
});
