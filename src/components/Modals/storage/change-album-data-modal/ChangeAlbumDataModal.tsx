import React, { FC, useCallback, useState, useLayoutEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdAudiotrack, MdOutlineEdit, MdPerson, MdShortText } from 'react-icons/md';
import {
  ActionWindow,
  Button,
  FileUploader,
  Image,
  Input,
  ItemSelector,
  StorageItem,
  ViewItemLayout,
  WorkplaceModal,
} from 'components';
import { useActions, useValidInput, useChangeDataWindows } from 'hooks';
import { nameValidator, nickValidator, PropertyFactory } from 'helpers';
import { IClientItemData, ItemTypes } from 'types';
import './ChangeAlbumDataModal.scss';

export interface IChangeAlbumDataModalProps {
  onClose: () => void;
  currentItemData: IClientItemData;
}

export const ChangeAlbumDataModal: FC<IChangeAlbumDataModalProps> = (props) => {
  const { onClose, currentItemData } = props;

  const albumTracks = [...(currentItemData.tracks || [])].map((track) =>
    PropertyFactory.create(track)
  );
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
  const nameInput = useValidInput([nameValidator]);
  const authorInput = useValidInput([nickValidator]);
  const [selectedItems, setSelectedItems] = useState<IClientItemData[]>(albumTracks);
  const { changeAlbumImage, changeAlbumTracks, changeAlbumData } = useActions();
  const { name, author } = currentItemData;

  useLayoutEffect(() => {
    nameInput.changeValue(name);
    authorInput.changeValue(author || '');
  }, [currentItemData]);

  const setImageHandler = useCallback((file: File) => setImage(file), []);

  const changeImage = useCallback(() => {
    if (!image) return;
    changeAlbumImage({ image, id: currentItemData.id, type: currentItemData.type });
    closeIsImage();
  }, [image]);

  const changeTracks = useCallback(() => {
    changeAlbumTracks({
      tracks: selectedItems.map((item) => item.id),
      id: currentItemData.id,
      type: currentItemData.type,
    });
    closeIsFile();
  }, [selectedItems]);

  const changeData = () => {
    if (!nameInput.value || nameInput.isError) return;
    if (!authorInput.value || authorInput.isError) return;

    changeAlbumData({
      name: nameInput.value,
      author: authorInput.value,
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
        <div className="change-data-album-modal">
          <div className="change-data-album-modal__image">
            <Image
              fontSize={100}
              className="change-data-album-modal__img"
              itemData={currentItemData}
            />
            <div className="change-data-album-modal__id">ID: {currentItemData.id}</div>
            <div className="change-data-album-modal__button">
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

          <div className="change-data-album-modal__track">
            <div className="change-data-album-modal__current">
              {albumTracks.map((track) => (
                <StorageItem isShowSize key={track.id} isDark isPlay itemData={track} />
              ))}
            </div>
            <div className="change-data-album-modal__button">
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
                      animateHeiht={300}
                      animateWidth={400}
                      exitHeiht={0}
                      exitWidth={0}
                      onClose={closeIsFile}
                      onSuccess={changeTracks}
                      actionName="Изменить трек"
                      className="file-window-file"
                    >
                      <div className="change-tracks">
                        <ItemSelector
                          height={160}
                          selectedItems={selectedItems}
                          setSelectedItems={setSelectedItems}
                          onlyTypes={[ItemTypes.TRACK]}
                        />
                      </div>
                    </ActionWindow>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="change-data-album-modal__data">
            <div className="change-data-album-modal__File-data">
              <div className="change-data-album-modal__name">Название: {name}</div>
              <div className="change-data-album-modal__name">Автор: {author}</div>
            </div>
            <div className="change-data-album-modal__button">
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
                      animateHeiht={250}
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
