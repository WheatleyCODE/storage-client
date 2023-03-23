import React, { FC, useCallback, useState, useLayoutEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineEdit, MdShortText, MdVideocam } from 'react-icons/md';
import {
  ActionWindow,
  Button,
  FileUploader,
  Image,
  Input,
  Textarea,
  ViewItemLayout,
  WorkplaceModal,
} from 'components';
import { useActions, useValidInput, useChangeDataWindows } from 'hooks';
import { nameValidator, nickValidator } from 'helpers';
import { getFileLink } from 'utils';
import { IClientItemData } from 'types';
import './ChangeVideoDataModal.scss';

export interface IChangeVideoDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeVideoDataModal: FC<IChangeVideoDataModalProps> = (props) => {
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
  const [video, setVideo] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const descriptionInput = useValidInput([nickValidator]);
  const { changeVideoImage, changeVideoFile, changeVideoData } = useActions();
  const { name, description } = currentItemData;

  useLayoutEffect(() => {
    nameInput.changeValue(name);
    descriptionInput.changeValue(description || '');
  }, [currentItemData]);

  const setImageHandler = useCallback((file: File) => setImage(file), []);
  const setVideoHandler = useCallback((file: File) => setVideo(file), []);

  const changeImage = useCallback(() => {
    if (!image) return;
    changeVideoImage({ id: currentItemData.id, image, type: currentItemData.type });
    closeIsImage();
  }, [image]);

  const changeFile = useCallback(() => {
    if (!video) return;

    changeVideoFile({ video, id: currentItemData.id, type: currentItemData.type });
    closeIsFile();
  }, [video]);

  const changeData = () => {
    if (!nameInput.value || nameInput.isError) return;
    if (!descriptionInput.value || descriptionInput.isError) return;

    changeVideoData({
      name: nameInput.value,
      description: descriptionInput.value,
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
        <div className="change-data-video-modal">
          <div className="change-data-video-modal__image">
            <Image
              fontSize={100}
              className="change-data-video-modal__img"
              itemData={currentItemData}
            />
            <div className="change-data-video-modal__id">ID: {currentItemData.id}</div>
            <div className="change-data-video-modal__button">
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

          <div className="change-data-video-modal__track">
            <div className="change-data-video-modal__current">
              {getFileLink(currentItemData)}
              <video controls height="85">
                <track kind="captions" />
                <source src={getFileLink(currentItemData) || ''} type="video/mp4" />
              </video>
            </div>
            <div className="change-data-video-modal__button">
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
                      onSuccess={changeFile}
                      actionName="Изменить трек"
                      className="file-window-file"
                    >
                      <div className="change-file">
                        <FileUploader
                          acceptExt={['mp4']}
                          setFile={setVideoHandler}
                          accept="video/*"
                          label="Выберите видео"
                        />
                      </div>
                    </ActionWindow>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="change-data-video-modal__data">
            <div className="change-data-video-modal__File-data">
              <div className="change-data-video-modal__name">Название: {name}</div>
              <div className="change-data-video-modal__name">Описание: {description}</div>
            </div>
            <div className="change-data-video-modal__button">
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
                      animateHeiht={300}
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
                          Icon={MdVideocam}
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
                        <Textarea
                          Icon={MdShortText}
                          value={descriptionInput.value}
                          placeholder="Описание"
                          onChange={descriptionInput.onChange}
                          onBlur={descriptionInput.onBlur}
                          onFocus={descriptionInput.onFocus}
                          isError={descriptionInput.isError}
                          validError={descriptionInput.validError}
                          isActive={descriptionInput.isActive}
                          changeFocus={descriptionInput.changeFocus}
                          changeActive={descriptionInput.changeActive}
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
