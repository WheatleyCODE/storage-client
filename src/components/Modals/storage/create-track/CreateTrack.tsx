import React, { FC, useCallback, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { MdAudiotrack, MdPerson, MdShortText } from 'react-icons/md';
import { useActions, useValidInput } from 'hooks';
import { Input, Stepper, Step, StepperModal, Textarea, FileUploader } from 'components';
import { nameValidator, nickValidator, textAreaValidator } from 'helpers';
import { createTrackStepTitles } from 'consts';
import { checkPathnameOnPathRoute } from 'utils';
import { PathRoutes } from 'types';
import './CreateTrack.scss';

export interface ICreateTrackProps {
  onClose: () => void;
}

export const CreateTrack: FC<ICreateTrackProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const authorInput = useValidInput([nickValidator]);
  const textInput = useValidInput([textAreaValidator]);
  const [activeStep, setActiveStep] = useState(0);
  const { createTrack } = useActions();
  const { id } = useParams();
  const { pathname } = useLocation();

  const setImageHandler = useCallback((file: File) => setImage(file), []);
  const setAudioHandler = useCallback((file: File) => setAudio(file), []);

  const addStep = () => {
    if (activeStep === 0) {
      if (!nameInput.value || nameInput.isError) return;
      if (!authorInput.value || authorInput.isError) return;
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

  const createTrackHandler = () => {
    if (!nameInput.value || nameInput.isError) return;
    if (!authorInput.value || authorInput.isError) return;
    if (!textInput.value || textInput.isError) return;
    if (!audio || !image) return;

    const filds: { parent?: string; album?: string } = {};

    if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_FOLDERS)) {
      filds.parent = id;
    }

    if (checkPathnameOnPathRoute(pathname, PathRoutes.STORAGE_ALBUMS)) {
      filds.album = id;
    }

    createTrack({
      name: nameInput.value,
      author: authorInput.value,
      text: textInput.value,
      audio,
      image,
      ...filds,
    });

    onClose();
  };

  return (
    <StepperModal
      title="Создать трек"
      activeStep={activeStep}
      stepTitlesLength={createTrackStepTitles.length}
      subStep={subStep}
      addStep={addStep}
      lastButtonHandler={createTrackHandler}
      lastButtonText="Создать трек"
    >
      <div className="create-track">
        <Stepper
          className="create-track__stepper"
          activeStep={activeStep}
          stepTitles={createTrackStepTitles}
        >
          <Step className="create-track__step">
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

          <Step className="create-track__step">
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
          </Step>

          <Step className="create-track__step files">
            <FileUploader
              initFile={image}
              setFile={setImageHandler}
              accept="image/*"
              label="Выберите картинку"
            />
            <FileUploader
              initFile={audio}
              setFile={setAudioHandler}
              accept="audio/*"
              label="Выберите аудиофайл"
            />
          </Step>
        </Stepper>
      </div>
    </StepperModal>
  );
};
