import React, { FC, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowDropUp, MdOutlineClose } from 'react-icons/md';
import { Button } from 'components';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { uploaderActions } from 'store/uploader/uploader.slice';
import { POPUP_MENU_ITEM_HEIGHT, POPUP_MENU_PADDING } from 'consts';
import './Uploader.scss';
import { UploaderItem } from './uploader-item/UploaderItem';

export const Uploader: FC = () => {
  const [show, setShow] = useState(true);
  const { progress, fileNames, isUpload } = useTypedSelector((state) => state.uploader);
  const dispatch = useTypedDispatch();

  const toggleShow = useCallback(() => setShow((p) => !p), []);

  const closeUploader = useCallback(() => {
    dispatch(uploaderActions.setIsOpen(false));
  }, []);

  const height = fileNames.length * POPUP_MENU_ITEM_HEIGHT + POPUP_MENU_PADDING;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: height }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: height }}
      transition={{ duration: 0.2 }}
      className="uploader"
    >
      <div className="uploader__header">
        {isUpload ? (
          <div className="uploader__title">Загрузка завершена ({progress}%)</div>
        ) : (
          <div className="uploader__title">Загрузка файлов ({progress}%)</div>
        )}

        <div className="uploader__buttons">
          <Button
            onClick={toggleShow}
            color="black"
            radius="rounded"
            Icon={MdArrowDropUp}
            type="icon"
            className={`icon ${show ? 'rotate' : ''}`}
          />
          <Button
            onClick={closeUploader}
            className="icon"
            color="black"
            radius="rounded"
            Icon={MdOutlineClose}
            type="icon"
          />
        </div>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="uploader__items"
          >
            {fileNames.map((name) => (
              <UploaderItem key={name} isUpload={isUpload} title={name} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
