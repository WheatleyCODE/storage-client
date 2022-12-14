import React, { FC, useCallback, useState } from 'react';
import { MdAudiotrack, MdPerson, MdShortText } from 'react-icons/md';
import { StepperModal, Stepper, Step, Input, Textarea, FileUploader } from 'components';
import { useValidInput } from 'hooks';
import { nameValidator, nickValidator, textAreaValidator } from 'helpers';
import { createVideoStepTitles } from 'consts';
import './CreateVideo.scss';

export interface ICreateVideoProps {
  onClose: () => void;
}

export const CreateVideo: FC<ICreateVideoProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const authorInput = useValidInput([nickValidator]);
  const textInput = useValidInput([textAreaValidator]);
  const [activeStep, setActiveStep] = useState(0);

  const addStep = () => {
    if (activeStep === 0) {
      if (!nameInput.value || nameInput.isError) return;
      setActiveStep((p) => (p += 1));
      return;
    }

    if (activeStep === 1) {
      if (!textInput.value || textInput.isError) return;
      setActiveStep((p) => (p += 1));
      return;
    }

    setActiveStep((p) => (p += 1));
  };
  const subStep = useCallback(() => setActiveStep((p) => (p -= 1)), []);

  const setImageHandler = useCallback((file: File) => setImage(file), []);
  const setVideoHandler = useCallback((file: File) => setVideo(file), []);

  return (
    <StepperModal
      title="Создать видео"
      activeStep={activeStep}
      stepTitlesLength={createVideoStepTitles.length}
      subStep={subStep}
      addStep={addStep}
      lastButtonHandler={() => {}}
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

          <Step className="create-video__step">
            <Textarea
              Icon={MdShortText}
              value={textInput.value}
              placeholder="Описание"
              onChange={textInput.onChange}
              onBlur={textInput.onBlur}
              onFocus={textInput.onFocus}
              isError={textInput.isError}
              validError={textInput.validError}
              isActive={textInput.isActive}
              changeFocus={textInput.changeFocus}
              changeActive={textInput.changeActive}
            />
          </Step>

          <Step className="create-video__step files">
            <FileUploader
              initFile={image}
              setFile={setImageHandler}
              accept="image/*"
              label="Выберите картинку"
            />
            <FileUploader
              initFile={video}
              setFile={setVideoHandler}
              accept="video/*"
              label="Выберите видео"
            />
          </Step>
        </Stepper>
      </div>
    </StepperModal>
  );
};
