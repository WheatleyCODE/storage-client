/* eslint-disable no-return-assign */
import React, { FC, useCallback, useState } from 'react';
import { MdAudiotrack, MdPerson, MdShortText } from 'react-icons/md';
import { Input, Stepper, Step, Button, Textarea, FileUploader } from 'components';
import { useValidInput } from 'hooks';
import { nameValidator, nickValidator, textAreaValidator } from 'helpers';
import './CreateTrack.scss';

export interface ICreateTrackProps {
  onClose: () => void;
}

const stepTiles = [
  { title: 'Название и автор' },
  { title: 'Текст трека' },
  { title: 'Загрузка файлов' },
];

export const CreateTrack: FC<ICreateTrackProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const nameInput = useValidInput([nameValidator]);
  const authorInput = useValidInput([nickValidator]);
  const textInput = useValidInput([textAreaValidator]);
  const [activeStep, setActiveStep] = useState(0);

  const setImageHandler = useCallback((file: File) => setImage(file), []);
  const setAudioHandler = useCallback((file: File) => setAudio(file), []);
  const addStep = useCallback(() => setActiveStep((p) => (p += 1)), []);
  const subStep = useCallback(() => setActiveStep((p) => (p -= 1)), []);

  const createTrack = useCallback(() => console.log('Создать трек'), []);

  return (
    <div className="create-track">
      <h1 className="create-track__title">Создание трека</h1>

      <Stepper activeStep={activeStep} stepTitles={stepTiles}>
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
        <Step className="create-track__step">
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

      <div className="create-track__buttons">
        <Button disable={activeStep === 0} onClick={subStep} text="Назад" />

        {activeStep === stepTiles.length - 1 ? (
          <Button color="blue" outline="fill" onClick={createTrack} text="Создать трек" />
        ) : (
          <Button color="blue" outline="fill" onClick={addStep} text="Вперёд" />
        )}
      </div>
    </div>
  );
};
