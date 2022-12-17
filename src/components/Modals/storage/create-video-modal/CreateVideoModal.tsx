import React, { FC, useCallback, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { MdAudiotrack, MdShortText } from 'react-icons/md';
import {
  StepperModal,
  Stepper,
  Step,
  Input,
  Textarea,
  FileUploader,
  Portal,
  Backdrop,
  Modal,
} from 'components';
import { useActions, useValidInput } from 'hooks';
import { nameValidator, textAreaValidator } from 'helpers';
import { createVideoStepTitles } from 'consts';
import { checkPathnameOnPathRoute } from 'utils';
import { PathRoutes } from 'types';
import './CreateVideoModal.scss';

export interface ICreateVideoModalProps {
  onClose: () => void;
}

export const CreateVideoModal: FC<ICreateVideoModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const descriptionInput = useValidInput([textAreaValidator]);
  const [activeStep, setActiveStep] = useState(0);
  const { createVideo } = useActions();
  const { id } = useParams();
  const { pathname } = useLocation();

  const addStep = () => {
    if (activeStep === 0) {
      if (!nameInput.value || nameInput.isError) return;
    }

    if (activeStep === 1) {
      if (!descriptionInput.value || descriptionInput.isError) return;
    }

    setActiveStep((p) => (p += 1));
  };
  const subStep = useCallback(() => setActiveStep((p) => (p -= 1)), []);

  const setImageHandler = useCallback((file: File) => setImage(file), []);
  const setVideoHandler = useCallback((file: File) => setVideo(file), []);

  const createVideoHandler = () => {
    if (!nameInput.value || nameInput.isError) return;
    if (!descriptionInput.value || descriptionInput.isError) return;
    if (!video || !image) return;

    const filds: { parent?: string } = {};

    if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_FOLDERS)) {
      filds.parent = id;
    }

    createVideo({
      name: nameInput.value,
      description: descriptionInput.value,
      video,
      image,
      ...filds,
    });

    onClose();
  };

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal className="create-video-modal-width" onClose={onClose}>
          <StepperModal
            title="Создать видео"
            activeStep={activeStep}
            stepTitlesLength={createVideoStepTitles.length}
            subStep={subStep}
            addStep={addStep}
            lastButtonHandler={createVideoHandler}
            lastButtonText="Создать видео"
          >
            <div className="create-video">
              <Stepper
                className="create-video__stepper"
                activeStep={activeStep}
                stepTitles={createVideoStepTitles}
              >
                <Step className="create-video__step">
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
                </Step>

                <Step className="create-video__step">
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
                </Step>

                <Step className="create-video__step files">
                  <FileUploader
                    initFile={image}
                    acceptExt={['jpg', 'png', 'jpeg']}
                    setFile={setImageHandler}
                    accept="image/*"
                    label="Выберите картинку"
                  />
                  <FileUploader
                    initFile={video}
                    acceptExt={['mp4']}
                    setFile={setVideoHandler}
                    accept="video/*"
                    label="Выберите видео"
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
