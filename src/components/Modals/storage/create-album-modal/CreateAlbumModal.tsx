import React, { FC, useState, useCallback } from 'react';
import { MdLibraryMusic, MdPerson } from 'react-icons/md';
import { useLocation, useParams } from 'react-router';
import { useActions, useValidInput } from 'hooks';
import {
  Input,
  StepperModal,
  Stepper,
  Step,
  FileUploader,
  Portal,
  Modal,
  Backdrop,
  ItemSelector,
} from 'components';
import { nameValidator, nickValidator } from 'helpers';
import { createAlbumStepTitles } from 'consts';
import { checkPathnameOnPathRoute } from 'utils';
import { IClientItemData, ItemTypes, PathRoutes } from 'types';
import './CreateAlbumModal.scss';

export interface ICreateAlbumModalProps {
  onClose: () => void;
}

export const CreateAlbumModal: FC<ICreateAlbumModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const authorInput = useValidInput([nickValidator]);
  const [selectedItems, setSelectedItems] = useState<IClientItemData[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const { createAlbum } = useActions();
  const { id } = useParams();
  const { pathname } = useLocation();

  const setImageHandler = useCallback((file: File) => setImage(file), []);

  const addStep = () => {
    if (activeStep === 0) {
      if (!nameInput.value || nameInput.isError) return;
      if (!authorInput.value || authorInput.isError) return;
    }

    setActiveStep((p) => (p += 1));
  };
  const subStep = useCallback(() => setActiveStep((p) => (p -= 1)), []);

  const createAlbumHandler = () => {
    if (!nameInput.value || nameInput.isError) return;
    if (!authorInput.value || authorInput.isError) return;
    if (!image) return;

    const filds: { parent?: string } = {};

    if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_FOLDERS)) {
      filds.parent = id;
    }

    createAlbum({
      name: nameInput.value,
      author: authorInput.value,
      image,
      tracks: selectedItems.map((item) => item.id),
      ...filds,
    });

    onClose();
  };

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal className="create-album-modal-width" onClose={onClose}>
          <StepperModal
            title="Создать альбом"
            activeStep={activeStep}
            stepTitlesLength={createAlbumStepTitles.length}
            subStep={subStep}
            addStep={addStep}
            lastButtonHandler={createAlbumHandler}
            lastButtonText="Создать альбом"
          >
            <div className="create-album-modal">
              <Stepper
                className="create-album-modal__stepper"
                activeStep={activeStep}
                stepTitles={createAlbumStepTitles}
              >
                <Step className="create-album-modal__step">
                  <Input
                    Icon={MdLibraryMusic}
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
                </Step>

                <Step className="create-album-modal__step">
                  <FileUploader
                    acceptExt={['jpg', 'png', 'jpeg']}
                    initFile={image}
                    setFile={setImageHandler}
                    accept="image/*"
                    label="Выберите картинку"
                  />
                </Step>

                <Step className="create-album-modal__step">
                  <ItemSelector
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    onlyTypes={[ItemTypes.TRACK]}
                  />
                </Step>
              </Stepper>
            </div>
          </StepperModal>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
