import React, { FC } from 'react';
import { MdAudiotrack } from 'react-icons/md';
import { Input, Confirm } from 'components';
import { useValidInput } from 'hooks';
import { nameValidator } from 'helpers';
import './CreateTrack.scss';

export interface ICreateTrackProps {
  onClose: () => void;
}

export const CreateTrack: FC<ICreateTrackProps> = ({ onClose }) => {
  const nameInput = useValidInput([nameValidator]);

  return (
    <Confirm onClose={onClose} onUpprove={() => {}}>
      <div className="create-track">
        <h1 className="create-track__title">Создание трека</h1>

        <Input
          Icon={MdAudiotrack}
          value={nameInput.value}
          type="text"
          placeholder="Назввание трека"
          onChange={nameInput.onChange}
          onBlur={nameInput.onBlur}
          onFocus={nameInput.onFocus}
          isError={nameInput.isError}
          validError={nameInput.validError}
          isActive={nameInput.isActive}
          changeFocus={nameInput.changeFocus}
          changeActive={nameInput.changeActive}
        />
      </div>
    </Confirm>
  );
};
