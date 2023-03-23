import React, { FC, useCallback, useState, useLayoutEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdAudiotrack, MdOutlineEdit, MdPerson, MdShortText } from 'react-icons/md';
import {
  ActionWindow,
  Button,
  FileUploader,
  Image,
  Input,
  StorageItem,
  Textarea,
  ViewItemLayout,
  WorkplaceModal,
} from 'components';
import { useActions, useValidInput, useChangeDataWindows } from 'hooks';
import { nameValidator, nickValidator, textAreaValidator } from 'helpers';
import { IClientItemData } from 'types';
import './ChangeTrackDataModal.scss';

export interface IChangeTrackDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeTrackDataModal: FC<IChangeTrackDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;
  const {
    isData,
    isImage,
    isFile,
    closeIsData,
    closeIsImage,
    closeIsFile,
    closeWindows,
    togleChangeData,
    togleChangeImage,
    togleChangeFile,
  } = useChangeDataWindows();
  const [image, setImage] = useState<File | null>(null);
  const [track, setTrack] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const authorInput = useValidInput([nickValidator]);
  const textInput = useValidInput([textAreaValidator]);
  const { changeTrackData, changeTrackFile, changeTrackImage } = useActions();
  const { name, author, text } = currentItemData;

  useLayoutEffect(() => {
    nameInput.changeValue(name);
    authorInput.changeValue(author || '');
    textInput.changeValue(text || '');
  }, [currentItemData]);

  const setImageHandler = useCallback((file: File) => setImage(file), []);
  const setTrackHandler = useCallback((file: File) => setTrack(file), []);

  const changeImage = useCallback(() => {
    if (!image) return;
    changeTrackImage({ image, id: currentItemData.id, type: currentItemData.type });
    closeIsImage();
  }, [image]);

  const changeTrack = useCallback(() => {
    if (!track) return;
    changeTrackFile({ audio: track, id: currentItemData.id, type: currentItemData.type });
    closeIsFile();
  }, [track]);

  const changeData = () => {
    if (!nameInput.value || nameInput.isError) return;
    if (!authorInput.value || authorInput.isError) return;
    if (!textInput.value || textInput.isError) return;

    changeTrackData({
      name: nameInput.value,
      author: authorInput.value,
      text: textInput.value,
      id: currentItemData.id,
      type: currentItemData.type,
    });
    closeIsData();
  };

  return (
    <WorkplaceModal
      onChangeCurrent={closeWindows}
      onClickHeader={closeWindows}
      isChange
      currentItemData={currentItemData}
      onClose={onClose}
    >
      <ViewItemLayout onClickContainer={closeWindows}>
        <div className="change-data-track-modal">
          <div className="change-data-track-modal__image">
            <Image
              fontSize={100}
              className="change-data-track-modal__img"
              itemData={currentItemData}
            />
            <div className="change-data-track-modal__id">ID: {currentItemData.id}</div>
            <div className="change-data-track-modal__button">
              <div className="relative">
                <Button
                  onClick={togleChangeImage}
                  className="font-size"
                  outline="fill"
                  color="none-light"
                  type="icon"
                  Icon={MdOutlineEdit}
                />
                <AnimatePresence>
                  {isImage && (
                    <ActionWindow
                      initialHeiht={0}
                      initialWidth={0}
                      animateHeiht={180}
                      animateWidth={400}
                      exitHeiht={0}
                      exitWidth={0}
                      onClose={closeIsImage}
                      onSuccess={changeImage}
                      actionName="Изменить картинку"
                      className="file-window-image"
                    >
                      <div className="change-file">
                        <FileUploader
                          acceptExt={['jpg', 'png', 'jpeg']}
                          setFile={setImageHandler}
                          accept="image/*"
                          label="Выберите картинку"
                        />
                      </div>
                    </ActionWindow>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="change-data-track-modal__track">
            <div className="change-data-track-modal__current">
              <StorageItem isShowSize isDark isPlay itemData={currentItemData} />
            </div>
            <div className="change-data-track-modal__button">
              <div className="relative">
                <Button
                  onClick={togleChangeFile}
                  className="font-size"
                  outline="fill"
                  color="none-light"
                  type="icon"
                  Icon={MdOutlineEdit}
                />
                <AnimatePresence>
                  {isFile && (
                    <ActionWindow
                      initialHeiht={0}
                      initialWidth={0}
                      animateHeiht={180}
                      animateWidth={400}
                      exitHeiht={0}
                      exitWidth={0}
                      onClose={closeIsFile}
                      onSuccess={changeTrack}
                      actionName="Изменить трек"
                      className="file-window-file"
                    >
                      <div className="change-file">
                        <FileUploader
                          acceptExt={['mp3']}
                          setFile={setTrackHandler}
                          accept="audio/*"
                          label="Выберите аудио"
                        />
                      </div>
                    </ActionWindow>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="change-data-track-modal__data">
            <div className="change-data-track-modal__track-data">
              <div className="change-data-track-modal__name">Название: {name}</div>
              <div className="change-data-track-modal__name">Автор: {author}</div>
              <div className="change-data-track-modal__name">Текст: {text}</div>
            </div>
            <div className="change-data-track-modal__button">
              <div className="relative">
                <Button
                  onClick={togleChangeData}
                  className="font-size"
                  outline="fill"
                  color="none-light"
                  type="icon"
                  Icon={MdOutlineEdit}
                />
                <AnimatePresence>
                  {isData && (
                    <ActionWindow
                      initialHeiht={0}
                      initialWidth={0}
                      animateHeiht={370}
                      animateWidth={400}
                      exitHeiht={0}
                      exitWidth={0}
                      onClose={closeIsData}
                      onSuccess={changeData}
                      actionName="Изменить информацию"
                      className="file-window-data"
                    >
                      <div className="change-data">
                        <Input
                          Icon={MdAudiotrack}
                          value={nameInput.value}
                          type="text"
                          placeholder="Название"
                          onChange={nameInput.onChange}
                          onBlur={nameInput.onBlur}
                          onFocus={nameInput.onFocus}
                          isError={nameInput.isError}
                          validError={nameInput.validError}
                          isActive={nameInput.isActive}
                          changeFocus={nameInput.changeFocus}
                          changeActive={nameInput.changeActive}
                        />
                        <Input
                          Icon={MdPerson}
                          value={authorInput.value}
                          type="text"
                          placeholder="Автор"
                          onChange={authorInput.onChange}
                          onBlur={authorInput.onBlur}
                          onFocus={authorInput.onFocus}
                          isError={authorInput.isError}
                          validError={authorInput.validError}
                          isActive={authorInput.isActive}
                          changeFocus={authorInput.changeFocus}
                          changeActive={authorInput.changeActive}
                        />
                        <Textarea
                          Icon={MdShortText}
                          value={textInput.value}
                          placeholder="Текст трека"
                          onChange={textInput.onChange}
                          onBlur={textInput.onBlur}
                          onFocus={textInput.onFocus}
                          isError={textInput.isError}
                          validError={textInput.validError}
                          isActive={textInput.isActive}
                          changeFocus={textInput.changeFocus}
                          changeActive={textInput.changeActive}
                        />
                      </div>
                    </ActionWindow>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
